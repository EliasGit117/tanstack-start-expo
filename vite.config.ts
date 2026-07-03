import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { rnw } from 'vite-plugin-rnw'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    // rnw() wraps @vitejs/plugin-react and adds react-native-web support
    // (aliasing, Flow stripping, consistent NODE_ENV across SSR + client).
    rnw(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
