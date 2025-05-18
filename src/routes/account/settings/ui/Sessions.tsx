import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { toast } from 'sonner'
import { UAParser } from 'ua-parser-js'
import Button from '~/components/Button'
import Divider from '~/components/Divider'
import Icon from '~/components/Icon'
import Skeleton from '~/components/Skeleton'
import useCurrentSession from '~/hooks/useCurrentSession'
import { auth } from '~/libs/auth'
import { cn } from '~/utils/tailwind'

function Sessions() {
  const navigate = useNavigate()
  const { data: currentSession } = useCurrentSession()
  const {
    data: sessions,
    refetch: refetchSessions,
    isFetched,
  } = useQuery({
    queryKey: ['user-sessions'],
    queryFn: () => auth.listSessions(),
  })

  return (
    <div className="max-w-[30rem] py-4 px-4">
      <h3 className="text-lg font-bold mb-4">Active Sessions</h3>
      {isFetched
        ? sessions?.data
            ?.sort((a, b) => {
              if (a?.token === currentSession?.session?.token) return -1
              if (b?.token === currentSession?.session?.token) return 1
              return 0
            })
            ?.map((session) => {
              const userAgent = new UAParser(session?.userAgent ?? '')
              const os = userAgent.getOS()
              const browser = userAgent.getBrowser()
              const device = userAgent.getDevice()
              const isMobile = device?.type === 'mobile'
              const isCurrentSession =
                session.token === currentSession?.session?.token

              return (
                <div className="mb-4">
                  <div
                    className={cn(
                      'w-full flex items-center space-x-2',
                      isCurrentSession ? 'text-primary' : '',
                    )}
                  >
                    <Icon name={isMobile ? 'mobile' : 'laptop'} />
                    <p className="font-bold">{os?.name ?? ''}</p>
                    <Divider orientation="vertical" className="h-5" />
                    <p>{browser?.name ?? ''}</p>
                    <Divider orientation="vertical" className="h-5" />
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      onClick={async () => {
                        if (isCurrentSession) {
                          navigate({ to: '/logout' })
                          return
                        }
                        const res = await auth.revokeSession({
                          token: session.token,
                        })
                        if (res.error) {
                          toast.error(
                            res?.error?.message ?? 'Something went wrong...',
                          )
                        } else {
                          refetchSessions?.()
                          toast.success('Session terminated')
                        }
                      }}
                    >
                      {isCurrentSession ? 'Sign Out' : 'Terminate'}
                    </Button>
                  </div>
                  <p className="text-xs flex items-center">
                    Signed on:{' '}
                    <p className="text-zinc-600 dark:text-zinc-400 flex gap-x-2 ml-2">
                      <span>
                        {session?.createdAt?.toLocaleDateString() ?? ''}
                      </span>
                      <span>
                        {session?.createdAt?.toLocaleTimeString() ?? ''}
                      </span>
                    </p>
                  </p>
                </div>
              )
            })
        : new Array(3)
            .fill(0)
            .map(() => <Skeleton className="h-14 w-full my-3 rounded-lg" />)}
    </div>
  )
}

export default Sessions
