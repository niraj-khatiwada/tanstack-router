import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { auth } from '~/libs/auth'

export const getUserSessionServerFn = createServerFn().handler(async () => {
  const request = getWebRequest()

  if (!request?.headers) {
    return null
  }

  const { data, error } = await auth.getSession({
    fetchOptions: { headers: request?.headers },
  })
  if (error) {
    return null
  }
  return data
})
