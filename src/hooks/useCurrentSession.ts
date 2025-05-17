import { useQuery } from '@tanstack/react-query'
import { auth } from '~/libs/auth'

function useCurrentSession() {
  const response = useQuery({
    queryKey: ['current-user-session'],
    queryFn: async () => {
      const { data, error } = await auth.getSession()
      if (error) {
        return Promise.reject(error)
      }
      return data
    },
    refetchOnMount: true,
  })

  return response
}

export default useCurrentSession
