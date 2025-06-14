/* eslint-disable no-console */
import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { queryClient } from './providers/QueryClientProvider'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: 'intent',
      defaultErrorComponent: ErrorComponent,
      defaultNotFoundComponent: () => 'Not found!',
      context: { queryClient },
    }),
    queryClient,
  )

  if (process.env.LOG_DEBUG) {
    router.subscribe('onBeforeLoad', console.log)
    router.subscribe('onBeforeNavigate', console.log)
    router.subscribe('onBeforeRouteMount', console.log)
    router.subscribe('onInjectedHtml', console.log)
    router.subscribe('onLoad', console.log)
    router.subscribe('onRendered', console.log)
    router.subscribe('onResolved', console.log)
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
