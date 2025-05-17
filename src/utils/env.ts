import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z
    .string()
    .url()
    .transform((url) => (url.endsWith('/') ? url.slice(0, -1) : url)),
})

const envVariables = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
}

const parsed = envSchema.safeParse(envVariables)

if (!parsed.success) {
  throw new Error('Invalid environment variables', {
    cause: parsed.error.format(),
  })
}

export const env = parsed.data
