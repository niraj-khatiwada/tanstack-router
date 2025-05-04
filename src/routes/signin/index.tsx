import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import Link from '~/components/Link'
import { auth } from '~/libs/auth'
import { preventRoute } from '~/utils/route'

export const Route = createFileRoute('/signin/')({
  component: SignIn,
  beforeLoad: preventRoute,
})

const signInSchema = z.object({
  emailOrUsername: z.string().min(3),
  password: z.string().min(3),
})

type SignInSchema = z.infer<typeof signInSchema>

function SignIn() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: { emailOrUsername: '', password: '' } as SignInSchema,
    validators: {
      onChange: signInSchema,
    },
    async onSubmit({ value }) {
      const isEmail = z
        .string()
        .email()
        .safeParse(value.emailOrUsername).success
      try {
        const { error } = await (isEmail
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
        navigate({ to: '/dashboard' })
      } catch (error: any) {
        toast.error(error?.message ?? '')
      }
    },
  })
  return (
    <div className="mt-[20%]">
      <form
        className="space-y-4 max-w-[25rem] m-auto"
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit()
        }}
      >
        <h1 className="text-xl font-bold text-center">Sign In</h1>
        <form.Field name="emailOrUsername">
          {({ state, handleChange }) => (
            <TextInput
              value={state.value}
              placeholder="Email or Username"
              isInvalid={state.meta.errors.length > 0}
              errorMessage={state.meta.errors.map((e) => e?.message).join(', ')}
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
              errorMessage={state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-xl"
              isDisabled={!canSubmit}
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          )}
        />
        <Link
          href="/signup"
          className="text-sm mx-auto w-fit text-center block"
        >
          Sign Up
        </Link>
      </form>
    </div>
  )
}
