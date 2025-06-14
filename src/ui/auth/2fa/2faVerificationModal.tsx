import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'
import OTPInput from 'src/components/Input/OTPInput'
import Modal, { ModalContent } from 'src/components/Modal'
import { getCurrentSession } from 'src/hooks/useCurrentSession'
import { auth } from 'src/libs/auth'
import { z } from 'zod'
import { use2faStore } from './store'

const verifyOTPSchema = z.object({
  otp: z.string().min(6).max(6),
})

type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>

function Verify2FaCode() {
  const otpModalDiscloser = useDisclosure()

  const handleClose = () => {
    use2faStore.getState().setState({ verificationNeeded: false })
    otpModalDiscloser.onClose()
  }

  const form = useForm({
    defaultValues: {
      otp: '',
    } as VerifyOTPSchema,
    validators: {
      onSubmit: verifyOTPSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.twoFactor.verifyTotp({
          code: value.otp,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        form.reset()
        handleClose()
        await getCurrentSession({ networkMode: 'online' })
        use2faStore.getState().fireVerificationComplete()
      } catch (error: any) {
        toast.error(error?.message ?? 'Something went wrong...')
      }
    },
  })

  useEffect(() => {
    const unsubscribe = use2faStore.subscribe(
      (store) => store.state.verificationNeeded,
      (verificationNeeded) => {
        if (verificationNeeded) {
          otpModalDiscloser.onOpen()
        } else {
          otpModalDiscloser.onClose()
        }
      },
    )
    return () => {
      unsubscribe?.()
    }
  }, [otpModalDiscloser])

  return (
    <Modal
      isOpen={otpModalDiscloser.isOpen}
      onClose={handleClose}
      backdrop="blur"
      className="max-w-[22rem] overflow-hidden rounded-2xl"
    >
      <ModalContent className="flex flex-col justify-center items-center pt-1 pb-1 mt-4 px-8 py-6">
        <Icon name="lock" size={50} className="mb-4 text-primary" />
        <p className="text-xl px-10 text-center font-bold">
          Two Factor Authentication:
        </p>
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4 my-4"
        >
          <form.Field name="otp">
            {({ state, handleChange }) => (
              <div>
                <span className="text-sm opacity-70">
                  Enter your 6 digit code:
                </span>
                <OTPInput
                  id="2fa-otp"
                  length={6}
                  value={state.value}
                  isInvalid={state.meta.errors.length > 0}
                  errorMessage={state.meta.errors
                    .map((e) => e?.message)
                    .join(', ')}
                  onValueChange={(val) => handleChange(val)}
                  autoFocus
                />
              </div>
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
                className="bg-primary text-white py-2 rounded-xl w-full"
                isDisabled={!canSubmit || !isDirty}
                isLoading={isSubmitting}
              >
                Verify
              </Button>
            )}
          </form.Subscribe>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default Verify2FaCode
