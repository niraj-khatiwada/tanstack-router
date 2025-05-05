import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userControllerFindAllUsersOptions } from '~/api/gen/@tanstack/react-query.gen'
import { protectRoute } from '~/utils/route'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
  beforeLoad: protectRoute,
})

function Dashboard() {
  const { data } = useQuery(
    userControllerFindAllUsersOptions({
      query: { page: 1, limit: 10 },
    }),
  )

  return (
    <>
      <h1 className="text-2xl">Users:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
