import { magicLinkClient, usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { env } from '~/utils/env'

export const auth = createAuthClient({
  baseURL: env.VITE_API_URL,
  plugins: [usernameClient(), magicLinkClient()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
})
