import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import { auth } from '~/libs/auth'
import AlertDialog from '~/ui/dialogs/AlertDialog'
import { preventRouteBeforeLoad } from '~/utils/router/before-load'

export const Route = createFileRoute('/reset-password/')({
  component: ResetPassword,
  beforeLoad: preventRouteBeforeLoad,
})

const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((s) => s.password === s.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

function ResetPassword() {
  const navigate = useNavigate()
  const { token } = useSearch({ strict: false })

  const alertDialogDiscloser = useDisclosure()

  const form = useForm({
    defaultValues: { password: '', confirmPassword: '' } as ResetPasswordSchema,
    validators: {
      onChange: resetPasswordSchema,
    },
    async onSubmit({ value }) {
      try {
        if (value.password !== value.confirmPassword) {
          return
        }
        const { error } = await auth.resetPassword({
          newPassword: value.password,
          token,
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

  useEffect(() => {
    if (token == null) {
      setTimeout(() => {
        toast.error('Invalid token.')
      }, 100)
      navigate({ to: '/signin' })
    }
  }, [navigate, token])

  return (
    <div className="mt-[20%]">
      <div className="max-w-[25rem] m-auto">
        <h1 className="text-xl font-bold text-center mb-4">Reset Password</h1>
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field name="password">
            {({ state, handleChange }) => (
              <TextInput
                type="password"
                value={state.value}
                placeholder="New Password"
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name="confirmPassword">
            {({ state, handleChange }) => (
              <TextInput
                type="password"
                value={state.value}
                placeholder="Confirm New Password"
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
                Submit
              </Button>
            )}
          </form.Subscribe>
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
        title="Password Reset Successful"
        description="Your password has been changed successfully. Please use new password to log in to your account."
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
