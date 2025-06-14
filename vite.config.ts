import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'
import packageJSON from './package.json'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    svgr(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      emitWarning: false,
      emitError: true,
      exclude: ['src/api/gen'],
    }),
  ],
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  define: {
    __appVersion: JSON.stringify(packageJSON.version),
  },
})
