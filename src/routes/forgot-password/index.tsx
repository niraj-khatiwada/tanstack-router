import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import { auth } from '~/libs/auth'
import AlertDialog from '~/ui/dialogs/AlertDialog'

export const Route = createFileRoute({
  component: ForgotPassword,
  // beforeLoad: preventRouteBeforeLoad,
})

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

function ForgotPassword() {
  const navigate = useNavigate()

  const alertDialogDiscloser = useDisclosure()

  const form = useForm({
    defaultValues: { email: '' } as ForgotPasswordSchema,
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.forgetPassword({
          email: value.email,
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        form.reset()
        alertDialogDiscloser.onOpen()
      } catch (error: any) {
        toast.error(error?.message ?? '')
      }
    },
  })

  return (
    <div className="mt-[20%]">
      <div className="max-w-[25rem] m-auto">
        <h1 className="text-xl font-bold text-center mb-4">Forgot Password</h1>
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field name="email">
            {({ state, handleChange }) => (
              <TextInput
                value={state.value}
                placeholder="Enter your email"
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
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
                Submit
              </Button>
            )}
          />
        </form>
        <Button
          variant="light"
          className="text-sm mx-auto w-fit text-center block text-black dark:text-white mt-4"
          onPress={() => {
            navigate({ to: '/signin' })
          }}
        >
          {'< Back to SignIn'}
        </Button>
      </div>
      <AlertDialog
        alertType="success"
        title="Password Reset"
        description="A password reset link has been sent to your email."
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
