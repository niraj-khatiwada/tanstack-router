import { useForm } from '@tanstack/react-form'
import React from 'react'
import { z } from 'zod'

import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'

const verifyPasswordSchema = z.object({
  password: z.string().min(1),
})

type VerifyPasswordSchema = z.infer<typeof verifyPasswordSchema>

type VerifyPasswordProps = {
  onSubmit?: (_: { password: string }) => Promise<void> | void
}

function VerifyPassword({ onSubmit }: VerifyPasswordProps) {
  const form = useForm({
    defaultValues: {
      password: '',
    } as VerifyPasswordSchema,
    validators: {
      onSubmit: verifyPasswordSchema,
    },
    async onSubmit({ value }) {
      await onSubmit?.({ password: value.password })
      form.reset()
    },
  })

  return (
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
            placeholder="Enter your password"
            isInvalid={state.meta.errors.length > 0}
            errorMessage={state.meta.errors.map((e) => e?.message).join(', ')}
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
            size="sm"
            type="submit"
            className="bg-primary text-white py-2 rounded-xl"
            isDisabled={!canSubmit || !isDirty}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

export default VerifyPassword
