import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import TextInput from '~/components/Input/TextInput'
import { auth } from '~/libs/auth'
import AlertDialog from '~/ui/dialogs/AlertDialog'

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((s) => s.newPassword === s.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

function ChangePassword() {
  const navigate = useNavigate()
  const cannotChangePasswordDiscloser = useDisclosure()

  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      revokeOtherSessions: true,
    } as ChangePasswordSchema,
    validators: {
      onSubmit: changePasswordSchema,
    },
    async onSubmit({ value }) {
      try {
        if (value.newPassword !== value.confirmNewPassword) {
          return
        }
        const { error } = await auth.changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: value.revokeOtherSessions,
        })
        if (error) {
          if (error?.code === 'CREDENTIAL_ACCOUNT_NOT_FOUND') {
            cannotChangePasswordDiscloser.onOpen()
            return
          }
          toast.error(error?.message ?? '')
          return
        }
        form.reset()
        toast.success('Password changed successfully.')
      } catch (error: any) {
        toast.error(error?.message ?? '')
      }
    },
  })

  return (
    <div className="max-w-[30rem] py-4 px-4">
      <h3 className="text-lg font-bold mb-4">Change Password</h3>
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <form.Field name="currentPassword">
          {({ state, handleChange }) => (
            <TextInput
              type="password"
              value={state.value}
              placeholder="Current Password"
              isInvalid={state.meta.errors.length > 0}
              errorMessage={state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="newPassword">
          {({ state, handleChange }) => (
            <TextInput
              type="password"
              value={state.value}
              placeholder="New Password"
              isInvalid={state.meta.errors.length > 0}
              errorMessage={state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="confirmNewPassword">
          {({ state, handleChange }) => (
            <TextInput
              type="password"
              value={state.value}
              placeholder="Confirm New Password"
              isInvalid={state.meta.errors.length > 0}
              errorMessage={state.meta.errors.map((e) => e?.message).join(', ')}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <form.Field name="revokeOtherSessions">
          {({ state, handleChange }) => (
            <Checkbox
              defaultSelected={state.value}
              checked={state.value}
              isInvalid={state.meta.errors.length > 0}
              onChange={(e) => handleChange(e.target.checked)}
            >
              <p className="text-sm"> Sign out from other devices</p>
            </Checkbox>
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
              size="sm"
              type="submit"
              className="bg-primary text-white py-2 rounded-xl"
              isDisabled={!canSubmit || !isDirty}
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          )}
        </form.Subscribe>
      </form>
      <AlertDialog
        alertType="error"
        title="Cannot Change Password"
        description={
          <div className="px-4">
            <p className="text-center opacity-80 text-sm">
              Looks like your account was created via OAuth(eg: Google, Apple,
              etc.) which does not have a password yet.
              <span className="block mt-2">
                For security reasons, such accounts can only set a new password
                by going through <strong>Forgot Password</strong> flow.
              </span>
              <span className="block mt-2">
                If you want to set a new password, please press{' '}
                <strong>Logout & Proceed</strong> which will log you out from
                this session and takes you to next step.
              </span>
            </p>
          </div>
        }
        discloser={cannotChangePasswordDiscloser}
        renderFooter={({ closeModal }) => (
          <div className="w-full space-y-2">
            <Button
              onPress={() => {
                closeModal?.()
                navigate({
                  to: '/logout',
                  search: { redirectTo: '/forgot-password' },
                })
              }}
              className="p-0 m-0 w-full"
              fullWidth
              color="danger"
            >
              Logout & Proceed
            </Button>
            <Button
              onPress={() => {
                closeModal?.()
              }}
              className="p-0 m-0 w-full"
            >
              Cancel
            </Button>
          </div>
        )}
        modalProps={{ backdrop: 'blur' }}
      />
    </div>
  )
}

export default ChangePassword
