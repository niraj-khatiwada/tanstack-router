import {
  magicLinkClient,
  twoFactorClient,
  usernameClient,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { use2faStore } from '~/ui/auth/2fa/store'
import { env } from '~/utils/env'

export const auth = createAuthClient({
  baseURL: env.VITE_API_URL,
  plugins: [
    usernameClient(),
    magicLinkClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        use2faStore.getState().setState({ verificationNeeded: true })
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
})
