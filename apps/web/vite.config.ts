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


export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  resolve: {
    tsconfigPaths: true,
    alias: getNativeWindAliases()
  },
  plugins: [
    devtools(),
    cjsInterop({
      dependencies: [
        'nativewind/**',
        'react-native-css-interop/**',
        'inline-style-prefixer/**',
      ],
    }),
    viteCommonjs({
      include: ['react-native-css-interop'],
    }),
    paraglideVitePlugin({
      project: '../../packages/app/project.inlang',
      outdir: '../../packages/app/src/paraglide',
      strategy: ['cookie', 'preferredLanguage', 'url', 'baseLocale'],
      cookieName: 'lang',
    }),
    tanstackStart(),
    nitro(),
    rnw({
      jsxImportSource: 'nativewind',
      include: /\.(mjs|[tj]sx?)$/,
      exclude: /\/node_modules\/(?!react-native|@react-native|expo|@expo|@rn-primitives|nativewind)/,
    }),
    babel({ presets: [reactCompilerPreset()], }),
  ],
  optimizeDeps: {
    exclude: ['nativewind', 'react-native-css-interop'],
  },
  ssr: {
    noExternal: [
      'nativewind',
      'react-native-css-interop',
      'react-native-safe-area-context',
      /^@rn-primitives\//,
    ],
  },
});

function getNativeWindAliases(): AliasOptions {
  return [
    { find: 'nativewind/jsx-dev-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-dev-runtime' },
    { find: 'nativewind/jsx-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-runtime' },
    { find: /^react-native-css-interop$/, replacement: 'react-native-css-interop/src/index' }
  ];
}