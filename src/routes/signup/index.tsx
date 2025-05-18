import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import Link from '~/components/Link'
import { auth } from '~/libs/auth'
import GithubOAuth from '~/ui/auth/github-oauth'
import AlertDialog from '~/ui/dialogs/AlertDialog'
import { preventRouteBeforeLoad } from '~/utils/router/before-load'

export const Route = createFileRoute('/signup/')({
  component: SignUp,
  beforeLoad: preventRouteBeforeLoad,
})

const signupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, hyphens, and underscores',
    ),
  email: z.string().min(3).email(),
  password: z.string().min(8),
})

type SignUpSchema = z.infer<typeof signupSchema>

function SignUp() {
  const navigate = useNavigate()

  const [isEmailAuth, setIsEmailAuth] = useState(false)

  const alertDialogDiscloser = useDisclosure()

  const form = useForm({
    defaultValues: { email: '', password: '' } as SignUpSchema,
    validators: {
      onSubmit: signupSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.signUp.email({
          email: value.email,
          password: value.password,
          username: value.username,
          name: value.username,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        alertDialogDiscloser.onOpen()
      } catch (error: any) {
        toast.error(error?.message ?? '')
      }
    },
  })
  return (
    <div className="mt-[20%]">
      <div className="max-w-[25rem] m-auto">
        {isEmailAuth ? (
          <form
            className="space-y-4"
            onSubmit={(evt) => {
              evt.preventDefault()
              form.handleSubmit()
            }}
          >
            <h1 className="text-xl font-bold text-center">Sign Up</h1>
            <form.Field name="email">
              {({ state, handleChange }) => (
                <TextInput
                  value={state.value}
                  placeholder="Email"
                  isInvalid={state.meta.errors.length > 0}
                  errorMessage={state.meta.errors.map((e) => (
                    <p>{e?.message}</p>
                  ))}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
            </form.Field>
            <form.Field name="username">
              {({ state, handleChange }) => (
                <TextInput
                  value={state.value}
                  placeholder="Username"
                  isInvalid={state.meta.errors.length > 0}
                  errorMessage={state.meta.errors.map((e) => (
                    <p>{e?.message}</p>
                  ))}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
            </form.Field>
            <form.Field name="password">
              {({ state, handleChange }) => (
                <TextInput
                  value={state.value}
                  type="password"
                  placeholder="Password"
                  isInvalid={state.meta.errors.length > 0}
                  errorMessage={state.meta.errors.map((e) => (
                    <p>{e?.message}</p>
                  ))}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
            </form.Field>
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
                isDirty: state.isDirty,
              })}
            >
              {({ canSubmit, isSubmitting, isDirty }) => (
                <Button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-xl"
                  isDisabled={!canSubmit || !isDirty}
                  isLoading={isSubmitting}
                >
                  Sign Up
                </Button>
              )}
            </form.Subscribe>
            <Button
              variant="light"
              className="text-sm mx-auto w-fit text-center block text-black dark:text-white"
              onPress={() => {
                setIsEmailAuth(false)
              }}
            >
              {'< Back to SignUp'}
            </Button>
          </form>
        ) : (
          <div className="space-y-2">
            <Button
              variant="solid"
              color="primary"
              className="w-full"
              onPress={() => {
                setIsEmailAuth(true)
              }}
            >
              SignUp with Email
            </Button>
            <GithubOAuth />
            <Link
              href="/signin"
              className="text-sm mx-auto w-fit text-center block"
            >
              Sign In?
            </Link>
          </div>
        )}
      </div>
      <AlertDialog
        alertType="success"
        title="Verify your email"
        description="We've sent you a verification email. Please verify your email and proceed to login."
        discloser={alertDialogDiscloser}
        renderFooter={({ closeModal }) => (
          <Button
            onPress={() => {
              closeModal?.()
              navigate({ to: '/signin' })
            }}
            className="p-0 m-0 w-full"
          >
            OK
          </Button>
        )}
        modalProps={{ backdrop: 'blur' }}
      />
    </div>
  )
}
