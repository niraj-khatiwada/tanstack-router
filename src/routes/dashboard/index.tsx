import { createFileRoute } from '@tanstack/react-router'
import { auth } from '~/libs/auth'
import { protectRoute } from '~/utils/route'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
  beforeLoad: protectRoute,
})

function Dashboard() {
  const { data } = auth.useSession()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
