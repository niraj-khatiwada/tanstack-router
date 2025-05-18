import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import OTPInput from '~/components/Input/OTPInput'
import Modal, { ModalContent } from '~/components/Modal'
import { getCurrentSession } from '~/hooks/useCurrentSession'
import { auth } from '~/libs/auth'
import { use2faStore } from './store'

const verifyOTPSchema = z.object({
  otp: z.string().min(6).max(6),
})

type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>

type Verify2FaCodeProps = {
  onComplete?: () => Promise<void> | void
}

function Verify2FaCode({ onComplete }: Verify2FaCodeProps) {
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
        await onComplete?.()
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
