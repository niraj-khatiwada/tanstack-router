import { QueryClient } from '@tanstack/react-query'
import {
  ClientOnly,
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import React, { Suspense, type ReactNode } from 'react'
import Navbar from '~/components/Navbar'
import { Toaster } from '~/components/Toast'
import css from '~/global.css?url'
import { QueryClientProvider } from '~/providers/QueryClientProvider'
import { getThemeServerFn } from '~/server/functions/theme'
import Verify2FaCode from '~/ui/auth/2fa/2faVerificationModal'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  loader: () => getThemeServerFn(),
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: css,
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production' || typeof window === 'undefined'
    ? () => null
    : React.lazy(() =>
        // eslint-disable-next-line import/no-extraneous-dependencies
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const theme = Route.useLoaderData()
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider>
          <Navbar />
          {children}
          <ClientOnly>
            <Toaster />
            <Verify2FaCode />
          </ClientOnly>
        </QueryClientProvider>
        <Scripts />
        <ClientOnly>
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </ClientOnly>
      </body>
    </html>
  )
}
