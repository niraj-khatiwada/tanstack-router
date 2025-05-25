// eslint-disable-next-line import/no-extraneous-dependencies
import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'
import 'dotenv/config'

// Our Swagger Schema is protected behind a basic authentication. See backend .env for BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD
const API_URL = process.env.VITE_API_URL
const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD

const base64Credential = Buffer.from(
  `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`,
).toString('base64')

// @ts-ignore
const res = await fetch(`${API_URL}/swagger/json`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64Credential}`,
  },
})
// @ts-ignore
const schema = await res.json()

export default defineConfig({
  input: schema,
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
