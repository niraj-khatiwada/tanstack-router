// eslint-disable-next-line import/no-extraneous-dependencies
import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'
import 'dotenv/config'

const API_URL = process.env.VITE_API_URL

export default defineConfig({
  input: `${API_URL}/swagger/json`,
  output: {
    format: 'prettier',
    path: './src/api/gen',
  },
  plugins: [
    ...defaultPlugins,
    '@tanstack/react-query',
    { name: '@hey-api/client-fetch' },
  ],
})
