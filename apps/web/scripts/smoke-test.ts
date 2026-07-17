#!/usr/bin/env bun
// Builds the production output and hits it with a real HTTP server, the
// same way `bun run web:serve` / a real deploy would. Exists because the
// dev server (`bun run dev`) and the production build go through
// different Vite pipelines (viteCommonjs's `apply: "serve"` restriction
// being the sharpest example) — fixes that work in dev have silently
// broken the production build more than once. Run this before trusting
// any change to vite.config.ts or its RN/Expo interop dependencies.

import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';

const webDir = new URL('..', import.meta.url).pathname;
const PORT = 5299;

const ROUTES = ['/', '/blog', '/rsc', '/settings'];

const ERROR_MARKERS = [
  'Something went wrong',
  'HTTPError',
  'ReferenceError',
  'require is not defined',
  'window is not defined',
  'module is not defined',
  'Cannot find module'
];

function run(cmd: string, args: string[], opts: { cwd: string; env?: Record<string, string> }) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: opts.cwd, env: { ...process.env, ...opts.env }, stdio: 'inherit' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))));
  });
}

async function main() {
  console.log('Building production output...');
  await rm(`${webDir}/.output`, { recursive: true, force: true });
  await run('bun', ['--bun', 'vite', 'build'], { cwd: webDir });

  console.log(`Starting production server on port ${PORT}...`);
  const server = spawn('bun', ['run', `${webDir}/.output/server/index.mjs`], {
    cwd: webDir,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let serverOutput = '';
  server.stdout.on('data', (d) => (serverOutput += d.toString()));
  server.stderr.on('data', (d) => (serverOutput += d.toString()));

  try {
    await waitForServer(`http://localhost:${PORT}/`, 15_000);

    const failures: string[] = [];
    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      const res = await fetch(url);
      const body = await res.text();
      if (!res.ok) {
        failures.push(`${route}: HTTP ${res.status}`);
        continue;
      }
      const marker = ERROR_MARKERS.find((m) => body.includes(m));
      if (marker) {
        failures.push(`${route}: response body contains "${marker}"`);
      }
    }

    if (serverOutput.includes('Error in renderToReadableStream')) {
      failures.push('server logged an SSR render error (see output above)');
    }

    if (failures.length > 0) {
      console.error('\nSmoke test FAILED:');
      for (const f of failures) console.error(`  - ${f}`);
      console.error('\nServer output:\n' + serverOutput);
      process.exitCode = 1;
    } else {
      console.log(`\nSmoke test passed for: ${ROUTES.join(', ')}`);
    }
  } finally {
    server.kill();
  }
}

async function waitForServer(url: string, timeoutMs: number) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  throw new Error(`Server didn't respond at ${url} within ${timeoutMs}ms`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
