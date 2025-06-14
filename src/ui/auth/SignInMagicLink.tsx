import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { toast } from 'sonner'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'
import TextInput from 'src/components/Input/TextInput'
import { auth } from 'src/libs/auth'
import { z } from 'zod'
import AlertDialog from '../dialogs/AlertDialog'

export type SignInMagicLinkProps = {
  isFormVisible?: boolean
  onFormRequest?: () => void
}

const signInSchema = z.object({
  email: z.string().email(),
})

type SignInSchema = z.infer<typeof signInSchema>

function SignInMagicLink({
  isFormVisible,
  onFormRequest,
}: SignInMagicLinkProps) {
  const navigate = useNavigate()

  const alertDialogDiscloser = useDisclosure()

  const form = useForm({
    defaultValues: { email: '' } as SignInSchema,
    validators: {
      onSubmit: signInSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.signIn.magicLink({
          email: value.email,
          callbackURL: window.location.origin,
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
    <>
      {isFormVisible ? (
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
                placeholder="Email"
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
                Send Magic Link
              </Button>
            )}
          </form.Subscribe>
        </form>
      ) : (
        <Button
          type="button"
          className="w-full"
          endContent={<Icon name="link" />}
          onPress={() => {
            onFormRequest?.()
          }}
        >
          SignIn with Magic Link
        </Button>
      )}
      <AlertDialog
        alertType="success"
        title="Check your inbox"
        description="We've sent you a magic link. Please use that link from your inbox to sign in."
        discloser={alertDialogDiscloser}
        renderFooter={({ closeModal }) => (
          <Button
            onPress={() => {
              closeModal?.()
              form.reset()
              navigate({ to: '/signin' })
            }}
            className="p-0 m-0 w-full"
          >
            OK
          </Button>
        )}
        modalProps={{ backdrop: 'blur' }}
      />
    </>
  )
}

export default SignInMagicLink
