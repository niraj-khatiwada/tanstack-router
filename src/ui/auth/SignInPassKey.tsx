import { useLocation, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Button from '~/components/Button'
import Icon from '~/components/Icon'
import { getCurrentSession } from '~/hooks/useCurrentSession'
import { auth } from '~/libs/auth'

function SignInPassKey() {
  const [isSignInPending, setIsSignInPending] = useState(false)

  const navigate = useNavigate()
  const { search } = useLocation()

  const handleSignin = async () => {
    try {
      setIsSignInPending(true)
      const res = await auth.signIn.passkey()
      if (res?.error) {
        const message = res.error?.message ?? 'Something went wrong...'
        toast.error(message)
        return
      }
      await getCurrentSession({ networkMode: 'online' })
      navigate({ to: search.redirectTo ?? '/dashboard' })
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong...')
    } finally {
      setIsSignInPending(false)
    }
  }

  return (
    <Button
      type="button"
      className="w-full"
      endContent={<Icon name="lock" />}
      onClick={handleSignin}
      isLoading={isSignInPending}
      isDisabled={isSignInPending}
    >
      SignIn with PassKey
    </Button>
  )
}

export default SignInPassKey
