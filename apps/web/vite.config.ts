import { type AliasOptions, defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { rnw } from 'vite-plugin-rnw';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { nitro } from 'nitro/vite';
import { cjsInterop } from 'vite-plugin-cjs-interop';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';


const config = defineConfig({
  server: { port: Number(process.env.PORT) || 5173 },
  resolve: {
    tsconfigPaths: true,
    alias: getNativeWindAliases()
  },
  optimizeDeps: { exclude: ['nativewind', 'react-native-css-interop'] },
  ssr: { noExternal: ['nativewind', 'react-native-css-interop', 'react-native-safe-area-context', /^@rn-primitives\//] },
  plugins: [
    devtools(),
    cjsInterop({ dependencies: ['nativewind/**', 'react-native-css-interop/**', 'inline-style-prefixer/**'] }),
    // Converts css-interop's lazy `require("./components")` (and any other CJS
    // requires in the package) to static imports so the ESM-only SSR module
    // runner can execute it in dev.
    viteCommonjs({ include: ['react-native-css-interop'] }),
    paraglideVitePlugin({
      project: '../../packages/app/project.inlang',
      outdir: '../../packages/app/src/paraglide',
      strategy: ['cookie', 'preferredLanguage', 'url', 'baseLocale'],
      cookieName: 'lang'
    }),
    tanstackStart(),
    nitro(),
    rnw({
      jsxImportSource: 'nativewind',
      include: /\.(mjs|[tj]sx?)$/,
      exclude: /\/node_modules\/(?!react-native|@react-native|expo|@expo|@rn-primitives|nativewind)/
    }),
    babel({ presets: [reactCompilerPreset()] })
  ]
});


function getNativeWindAliases(): AliasOptions {
  // NativeWind's published jsx runtime is CJS and requires `react-native`at runtime,
  // which breaks both the SSR module runner (ESM-only) and bun's transpiler (RN ships Flow source).
  // Point the jsx runtime at react-native-css-interop's TypeScript source instead so it flows through Vite,
  // where `react-native` is aliased to react-native-web.

  return [
    { find: 'nativewind/jsx-dev-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-dev-runtime' },
    { find: 'nativewind/jsx-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-runtime' },
    // Bare imports resolve to dist/index.js (CJS), which neither the SSR module
    // runner nor the browser can execute. Point them at the TypeScript source.
    // Regex so subpath imports (e.g. the jsx runtime above) are left untouched.
    { find: /^react-native-css-interop$/, replacement: 'react-native-css-interop/src/index' }
  ];
}

export default config;
