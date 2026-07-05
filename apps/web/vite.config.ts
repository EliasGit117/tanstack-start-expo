import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { rnw } from 'vite-plugin-rnw';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { nitro } from 'nitro/vite';


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
    cssInteropSsrFix(),
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


function getNativeWindAliases(): Record<string, string> {
  // NativeWind's published jsx runtime is CJS and requires `react-native`
  // at runtime, which breaks both the SSR module runner (ESM-only) and
  // bun's transpiler (RN ships Flow source). Point the jsx runtime at
  // react-native-css-interop's TypeScript source instead so it flows
  // through Vite, where `react-native` is aliased to react-native-web.

  return {
    'nativewind/jsx-dev-runtime': 'react-native-css-interop/src/runtime/jsx-dev-runtime',
    'nativewind/jsx-runtime': 'react-native-css-interop/src/runtime/jsx-runtime'
  };
}

function cssInteropSsrFix() {
  return {
    name: 'css-interop-ssr-fix',
    transform(code: string, id: string) {
      if (id.includes('react-native-css-interop/src/runtime/wrap-jsx'))
        return ('import "./components";\n' + code.replace('if (process.env.NODE_ENV !== "test") require("./components");', ''));
    }
  };
}

export default config;
