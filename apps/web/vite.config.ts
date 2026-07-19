import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { rnw } from 'vite-plugin-rnw';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { nitro } from 'nitro/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';
import requireTransform from 'vite-plugin-require-transform';


export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: 'nativewind/jsx-dev-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-dev-runtime' },
      { find: 'nativewind/jsx-runtime', replacement: 'react-native-css-interop/src/runtime/jsx-runtime' },
      { find: /^react-native-css-interop$/, replacement: 'react-native-css-interop/src/index' }
    ],
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
    tsconfigPaths(),
    requireTransform({ fileRegex: /react-native-css-interop\/src\/.*\.tsx?$|expo\/src\/winter\/runtime\.ts$/ }),
    devtools({ injectSource: { enabled: true, ignore: { components: ['FullWindowOverlay'] } } }),
    viteCommonjs({ include: ['react-native-reanimated', 'react-native-svg'] }),
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
      exclude: /\/node_modules\/(?!react-native|@react-native|expo|@expo|@rn-primitives|nativewind|react-native-svg|lucide-react-native)/,
      // rnw spreads these opts into its internal @vitejs/plugin-react call.
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]]
      }
    })
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
      /^@rn-primitives\//,
      'expo',
      'expo-image'
    ]
  }
});

