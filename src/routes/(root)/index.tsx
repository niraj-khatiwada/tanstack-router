import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Link from '~/components/Link'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return (
    <div className="max-w-xl mx-auto px-6 mt-10 flex items-center gap-4 flex-wrap">
      <Link
        to="/dashboard"
        className="bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center"
      >
        Dashboard
      </Link>{' '}
      <Link
        to="/chat"
        className="bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center"
      >
        Chat
      </Link>{' '}
      <Link
        to="/signin"
        className="bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-md min-w-[200px] min-h-20 flex justify-center items-center"
      >
        SignIn
      </Link>
    </div>
  )
}

export default Root
