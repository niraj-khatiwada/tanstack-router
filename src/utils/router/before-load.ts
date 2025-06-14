import { BeforeLoadContextOptions, redirect } from '@tanstack/react-router'
import { getCurrentSession } from 'src/hooks/useCurrentSession'
import { getUserSessionServerFn } from '~/server/functions/auth'

/**
 * Protect routes access when there's no auth
 * For example: Profile page, Dashboard, etc.
 */
export async function protectRouteBeforeLoad(
  params: BeforeLoadContextOptions<any, any, any, any, any>,
) {
  try {
    const currentSession = await (typeof window === 'undefined'
      ? getUserSessionServerFn()
      : getCurrentSession({
          networkMode: 'cache-only',
        }))
    if (currentSession == null) {
      throw new Error()
    }
  } catch (err) {
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
  let currentSession: Awaited<ReturnType<typeof getCurrentSession>> | null =
    null
  try {
    currentSession = await (typeof window === 'undefined'
      ? getUserSessionServerFn()
      : getCurrentSession({
          networkMode: 'cache-only',
        }))
  } catch {
    //
  }
  if (!(currentSession == null)) {
    throw redirect({
      to: '/',
    })
  }
}
