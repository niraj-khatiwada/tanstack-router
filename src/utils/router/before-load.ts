import { BeforeLoadContextOptions, redirect } from '@tanstack/react-router'
import { auth } from '~/libs/auth'

/**
 * Protect routes access when there's no auth
 * For example: Profile page, Dashboard, etc.
 */
export async function protectRouteBeforeLoad(
  params: BeforeLoadContextOptions<any, any, any, any, any>,
) {
  const { data } = await auth.getSession()
  if (data?.session == null) {
    throw redirect({
      to: '/signin',
      search: { redirectTo: params.location.href },
    })
  }
}

/**
 * Prevent route access when there's auth
 * For example: Sign in, Sign up page, etc.
 */
export async function preventRouteBeforeLoad(
  _: BeforeLoadContextOptions<any, any, any, any, any>,
) {
  const { data } = await auth.getSession()
  if (data?.session) {
    throw redirect({ to: '/' })
  }
}
