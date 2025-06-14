import { Suspense, useEffect, useState } from 'react'

type HydrationSuspenseProps = {
  fallback: React.ReactNode
  children: React.ReactNode
}

function HydrationSuspense({ fallback, children }: HydrationSuspenseProps) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return <>{fallback}</>
  }

  return <Suspense>{children}</Suspense>
}

export default HydrationSuspense
