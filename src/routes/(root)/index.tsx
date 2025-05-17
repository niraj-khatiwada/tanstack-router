import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Divider from '~/components/Divider'
import Link from '~/components/Link'
import useCurrentSession from '~/hooks/useCurrentSession'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  const { data } = useCurrentSession()

  return (
    <div className="max-w-xl mx-auto px-6 mt-10 flex items-center gap-4 flex-wrap">
      {data?.session == null ? (
        <>
          <Link
            to="/signin"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
          >
            SignIn
          </Link>
          <Divider />
        </>
      ) : null}
      <Link
        to="/dashboard"
        className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
      >
        Dashboard
      </Link>{' '}
      <Link
        to="/chat"
        className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
      >
        Chat
      </Link>{' '}
      {data?.session ? (
        <>
          <Divider />
          <Link
            href="/account/settings"
            hash="profile"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
          >
            Profile
          </Link>
          <Link
            href="/account/settings"
            hash="sessions"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
          >
            Sessions
          </Link>
          <Link
            href="/account/settings"
            hash="change-password"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
          >
            Change Password
          </Link>
          <Link
            href="/account/settings"
            hash="2fa"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
          >
            Two Factor Authentication
          </Link>
          <Link
            href="/account/settings"
            hash="pass-keys"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4"
          >
            Pass Keys
          </Link>
          <Divider />
          <Link
            to="/logout"
            className="bg-zinc-100 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center px-4 text-red-500"
          >
            Logout
          </Link>
        </>
      ) : null}
    </div>
  )
}

export default Root
