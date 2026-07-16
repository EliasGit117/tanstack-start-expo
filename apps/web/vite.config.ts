import { type AliasOptions, defineConfig } from 'vite';
import path from 'node:path';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { rnw } from 'vite-plugin-rnw';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { nitro } from 'nitro/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';


export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173
  },
  resolve: {
    tsconfigPaths: true,
    alias: getNativeWindAliases(),
    dedupe: ['react', 'react-dom']
  },
  // rnw defines `global` as `window` for the browser; override back to
  // globalThis for SSR, where window doesn't exist.
  environments: {
    ssr: {
      define: {
        global: 'globalThis'
      }
    }
  },
  plugins: [
    devtools({
      // FullWindowOverlay resolves to React.Fragment on non-iOS; skip
      // injection there since Fragment rejects the injected prop.
      injectSource: { enabled: true, ignore: { components: ['FullWindowOverlay'] } }
    }),
    // react-native-reanimated ships a CJS script (validate-worklets-version)
    // with a bare `require()` call that Vite's SSR module runner can't
    // evaluate on its own; this plugin gives it proper require() interop.
    viteCommonjs({
      include: ['react-native-css-interop', 'react-native-svg', 'react-native-reanimated']
    }),
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
      exclude: /\/node_modules\/(?!react-native|@react-native|expo|@expo|@rn-primitives|nativewind|react-native-svg|lucide-react-native)/
    }),
    babel({ presets: [reactCompilerPreset()] })
  ],
  optimizeDeps: {
    include: [
      '@rn-primitives/portal',
      '@rn-primitives/dropdown-menu',
      '@rn-primitives/dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog'
    ]
  },
  ssr: {
    noExternal: [
      'nativewind',
      'lucide-react-native',
      /^react-native(-|$)/,
      /^@rn-primitives\//
    ]
  }
});

function getNativeWindAliases(): AliasOptions {
  return [
    { find: 'nativewind/jsx-dev-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-dev-runtime' },
    { find: 'nativewind/jsx-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-runtime' },
    { find: /^react-native-css-interop$/, replacement: 'react-native-css-interop/src/index' },
    { find: /^@app\/(.*)/, replacement: path.resolve(__dirname, '../../packages/app/src/$1') },
    { find: '@app', replacement: path.resolve(__dirname, '../../packages/app/src/index.ts') },
    { find: '@navigation', replacement: path.resolve(__dirname, '../../packages/navigation/src/index.ts') }
  ];
}