import { ClientOnly } from '@tanstack/react-router'
import React from 'react'
import Spinner from '~/components/Spinner'
import HydrationSuspense from '~/ui/suspense/HydrationSuspense'
import { protectRouteBeforeLoad } from '~/utils/router/before-load'

const AccountSettings = React.lazy(() => import('./ui/Index'))

export const Route = createFileRoute({
  component: () => (
    <HydrationSuspense
      fallback={
        <div className="mt-[40vh] flex justify-center items-center h-[100px] w-full">
          <Spinner />
        </div>
      }
    >
      <ClientOnly>
        <AccountSettings />
      </ClientOnly>
    </HydrationSuspense>
  ),
  beforeLoad: protectRouteBeforeLoad,
})
