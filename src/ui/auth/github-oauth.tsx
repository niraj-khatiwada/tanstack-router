import React from 'react'
import Button from '~/components/Button'
import Icon from '~/components/Icon'
import { auth } from '~/libs/auth'

function GithubOAuth() {
  const handleSignin = async () => {
    await auth.signIn.social({
      provider: 'github',
      errorCallbackURL: `${window.location.origin}/signin`,
      callbackURL: window.location.origin,
    })
  }
  return (
    <Button
      type="button"
      className="w-full"
      endContent={<Icon name="github" size={18} />}
      onPress={handleSignin}
    >
      Sign in with GitHub
    </Button>
  )
}

export default GithubOAuth
