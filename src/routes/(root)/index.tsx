import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Link from '~/components/Link'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return (
    <div className="mt-10">
      <Link to="/dashboard" className="mx-auto block w-fit">
        Dashboard
      </Link>{' '}
      <Link to="/chat" className="mx-auto block w-fit">
        Chat
      </Link>
    </div>
  )
}

export default Root
