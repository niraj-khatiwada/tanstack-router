import { useForm } from '@tanstack/react-form'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import TextInput from '~/components/Input/TextInput'
import { auth } from '~/libs/auth'

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
              type="submit"
              className="block bg-primary text-white py-2 rounded-xl"
              isDisabled={!canSubmit || !isDirty}
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}

export default ChangePassword
