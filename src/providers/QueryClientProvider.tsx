'use client'

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'

import { client } from '~/api/gen/client.gen'
import { env } from '~/utils/env'

client.setConfig({
  baseUrl: env.VITE_API_URL,
  credentials: 'include',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 1e4 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
})

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
