import React from 'react'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'
import { auth } from 'src/libs/auth'

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
      endContent={<Icon name="github" size={18} className="m-0 p-0" />}
      onPress={handleSignin}
    >
      Continue with GitHub
    </Button>
  )
}

export default GithubOAuth
