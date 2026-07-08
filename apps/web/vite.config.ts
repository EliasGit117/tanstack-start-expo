import { type AliasOptions, defineConfig } from 'vite';
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
  plugins: [
    devtools(),
    viteCommonjs({ include: ['react-native-css-interop', 'react-native-svg'] }),
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
  ssr: {
    noExternal: [
      'nativewind',
      'react-native-css-interop',
      'react-native-safe-area-context',
      'lucide-react-native',
      'react-native-svg',
      /^@rn-primitives\//
    ]
  }
});

function getNativeWindAliases(): AliasOptions {
  return [
    { find: 'nativewind/jsx-dev-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-dev-runtime' },
    { find: 'nativewind/jsx-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-runtime' },
    { find: /^react-native-css-interop$/, replacement: 'react-native-css-interop/src/index' }
  ];
}