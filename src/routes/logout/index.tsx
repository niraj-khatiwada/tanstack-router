import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import Spinner from '~/components/Spinner'
import { auth } from '~/libs/auth'

export const Route = createFileRoute({
  component: Logout,
})

async function clearAllStorage() {
  window.localStorage.clear()
  window.sessionStorage.clear()
  if (!('indexedDB' in window)) return
  if (indexedDB.databases) {
    const databases = await indexedDB.databases()
    databases.forEach((dbInfo) => {
      indexedDB.deleteDatabase(dbInfo.name!)
    })
  }
}

function Logout() {
  const navigate = useNavigate()
  const { search } = useLocation()

  const redirectTo = search?.redirectTo as string

  const handleLogout = async () => {
    try {
      await auth.signOut()
      await clearAllStorage()
    } catch {
      //
    }
    navigate({ to: redirectTo ?? '/', replace: true, reloadDocument: true })
  }

  useEffect(() => {
    handleLogout()
  })

  return (
    <div className="w-screen h-[90vh] flex justify-center items-center">
      <div className="flex items-center gap-4">
        <Spinner size="sm" />
        <p>Logging out...</p>
      </div>
    </div>
  )
}
