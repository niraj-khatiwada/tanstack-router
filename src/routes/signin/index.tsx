import { useForm } from '@tanstack/react-form'
import {
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import Link from '~/components/Link'
import { getCurrentSession } from '~/hooks/useCurrentSession'
import { auth } from '~/libs/auth'
import Verify2FaCode from '~/ui/auth/2fa/2faVerificationModal'
import GithubOAuth from '~/ui/auth/GithubOAuth'
import SignInMagicLink from '~/ui/auth/SignInMagicLink'
import { preventRouteBeforeLoad } from '~/utils/router/before-load'

export const Route = createFileRoute('/signin/')({
  component: SignIn,
  beforeLoad: preventRouteBeforeLoad,
})

const signInSchema = z.object({
  emailOrUsername: z.string().min(3),
  password: z.string().min(3),
})

type SignInSchema = z.infer<typeof signInSchema>

const locationHash = {
  email: 'email',
  magicLink: 'magicLink',
}

function SignIn() {
  const navigate = useNavigate()
  const { hash, search } = useLocation()

  const form = useForm({
    defaultValues: { emailOrUsername: '', password: '' } as SignInSchema,
    validators: {
      onSubmit: signInSchema,
    },
    async onSubmit({ value }) {
      const isEmail = z
        .string()
        .email()
        .safeParse(value.emailOrUsername).success
      try {
        const { error, data } = await (isEmail
          ? auth.signIn.email({
              email: value.emailOrUsername,
              password: value.password,
            })
          : auth.signIn.username({
              username: value.emailOrUsername,
              password: value.password,
            }))

        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        form.reset()

        if (data.token) {
          await getCurrentSession({ networkMode: 'online' })
          navigate({ to: search.redirectTo ?? '/dashboard' })
        }
        // Might have 2fa
      } catch (error: any) {
        toast.error(error?.message ?? '')
      }
    },
  })

  useEffect(() => {
    if (!(hash in locationHash)) {
      navigate({ to: '.', hash: '', search })
    }
  }, [hash, navigate, search])

  return (
    <div className="mt-[20%]">
      <div className="max-w-[25rem] m-auto">
        <h1 className="text-xl font-bold text-center mb-4">Sign In</h1>
        {hash === locationHash.email ? (
          <>
            <form
              onSubmit={(evt) => {
                evt.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <form.Field name="emailOrUsername">
                {({ state, handleChange }) => (
                  <TextInput
                    value={state.value}
                    placeholder="Email or Username"
                    isInvalid={state.meta.errors.length > 0}
                    errorMessage={state.meta.errors
                      .map((e) => e?.message)
                      .join(', ')}
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
                    errorMessage={state.meta.errors
                      .map((e) => e?.message)
                      .join(', ')}
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
                    Sign In
                  </Button>
                )}
              </form.Subscribe>
            </form>
            <Link
              to="/forgot-password"
              className="w-full justify-end text-sm my-2"
            >
              Forgot Password?
            </Link>
          </>
        ) : null}
        <div className="space-y-2">
          {!hash ? (
            <>
              <Button
                variant="solid"
                color="primary"
                className="w-full"
                onPress={() => {
                  navigate({ to: '.', search, hash: locationHash.email })
                }}
              >
                SignIn with Email
              </Button>
              <GithubOAuth />
            </>
          ) : null}
          {!hash || hash === locationHash.magicLink ? (
            <SignInMagicLink
              isFormVisible={hash === locationHash.magicLink}
              onFormRequest={() => {
                navigate({
                  to: '/signin',
                  search,
                  hash: locationHash.magicLink,
                })
              }}
            />
          ) : null}
          {!hash ? (
            <Link
              href="/signup"
              className="text-sm mx-auto w-fit text-center block"
            >
              Sign Up?
            </Link>
          ) : (
            <Button
              variant="light"
              className="text-sm mx-auto w-fit text-center block text-black dark:text-white mt-4"
              onPress={() => {
                navigate({ to: '.', search })
              }}
            >
              {'< Back to SignIn'}
            </Button>
          )}
        </div>
      </div>
      <Verify2FaCode
        onComplete={() => {
          navigate({ to: search.redirectTo ?? '/dashboard' })
        }}
      />
    </div>
  )
}
