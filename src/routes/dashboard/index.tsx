import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userControllerFindAllUsersOptions } from '~/api/gen/@tanstack/react-query.gen'
import { protectRouteBeforeLoad } from '~/utils/router/before-load'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
  beforeLoad: protectRouteBeforeLoad,
})

function Dashboard() {
  const { data } = useQuery(
    userControllerFindAllUsersOptions({
      query: { page: 1, limit: 10 },
    }),
  )

  return (
    <div className="max-w-xl mx-auto px-6">
      <h1 className="text-2xl">Users:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
