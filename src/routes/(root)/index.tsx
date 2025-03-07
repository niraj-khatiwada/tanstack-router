import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return <h1>Root Page</h1>
}

export default Root
