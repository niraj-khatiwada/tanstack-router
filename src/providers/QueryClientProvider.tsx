import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'
import {
  persistQueryClient,
  removeOldestQuery,
} from '@tanstack/react-query-persist-client'

import { client } from 'src/api/gen/client.gen'
import { env } from 'src/utils/env'

export const PERSISTER_KEY = 'UkVBQ1RfUVVFUll'

client.setConfig({
  baseUrl: env.VITE_API_URL,
  credentials: 'include',
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 1e4 * 60,
      retry: 3,
    },
    mutations: {
      retry: 0,
    },
  },
})

if (typeof window !== 'undefined') {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
    retry: removeOldestQuery,
    key: PERSISTER_KEY,
  })

  persistQueryClient({
    // @ts-ignore: No idea what this error mean
    queryClient,
    persister: localStoragePersister,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => query?.meta?.persist === true,
    },
  })
}

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
