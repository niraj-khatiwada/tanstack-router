import { useDisclosure } from '@heroui/react'
import { useForm } from '@tanstack/react-form'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'
import OTPInput from 'src/components/Input/OTPInput'
import Modal, { ModalContent } from 'src/components/Modal'
import { getCurrentSession } from 'src/hooks/useCurrentSession'
import { auth } from 'src/libs/auth'
import { z } from 'zod'
import Checkbox from '~/components/Checkbox'
import TextInput from '~/components/Input/TextInput'
import { use2faStore } from './store'

const verifyOTPSchema = z.object({
  otp: z.string().min(6).max(6),
  trustDevice: z.boolean().optional(),
})

const backupCodeSchema = z.object({
  code: z.string().min(3),
})

type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>
type BackupCodeSchema = z.infer<typeof backupCodeSchema>

function Verify2FaCode() {
  const otpModalDiscloser = useDisclosure()
  const [useBackupCode, setUseBackupCode] = useState(false)

  const handleClose = () => {
    use2faStore.getState().setState({ verificationNeeded: false })
    otpModalDiscloser.onClose()
  }

  const verifyOtpForm = useForm({
    defaultValues: {
      otp: '',
      trustDevice: false,
    } as VerifyOTPSchema,
    validators: {
      onSubmit: verifyOTPSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.twoFactor.verifyTotp({
          code: value.otp,
          trustDevice: value.trustDevice ?? false,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        verifyOtpForm.reset()
        handleClose()
        await getCurrentSession({ networkMode: 'online' })
        use2faStore.getState().fireVerificationComplete()
      } catch (error: any) {
        toast.error(error?.message ?? 'Something went wrong...')
      }
    },
  })

  const backupCodeForm = useForm({
    defaultValues: {
      code: '',
    } as BackupCodeSchema,
    validators: {
      onSubmit: backupCodeSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.twoFactor.verifyBackupCode({
          code: value.code,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        backupCodeForm.reset()
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
      <ModalContent className="flex flex-col justify-center items-center pt-1 pb-1 mt-4 px-4 py-6">
        <Icon name="lock" size={50} className="mb-4 text-primary" />
        <p className="text-xl px-10 text-center font-bold">
          Two Factor Authentication:
        </p>
        {!useBackupCode ? (
          <form
            onSubmit={(evt) => {
              evt.preventDefault()
              verifyOtpForm.handleSubmit()
            }}
            className="space-y-2 my-4"
          >
            <verifyOtpForm.Field name="otp">
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
            </verifyOtpForm.Field>
            <verifyOtpForm.Field name="trustDevice">
              {({ state, handleChange }) => (
                <div>
                  <Checkbox
                    checked={state.value}
                    onValueChange={(val) => handleChange(val)}
                  >
                    <span className="text-sm opacity-70">
                      Trust this device
                    </span>
                  </Checkbox>
                </div>
              )}
            </verifyOtpForm.Field>
            <verifyOtpForm.Subscribe
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
            </verifyOtpForm.Subscribe>
          </form>
        ) : (
          <form
            onSubmit={(evt) => {
              evt.preventDefault()
              backupCodeForm.handleSubmit()
            }}
            className="space-y-2 my-4"
          >
            <backupCodeForm.Field name="code">
              {({ state, handleChange }) => (
                <div>
                  <TextInput
                    value={state.value}
                    placeholder="Enter your backup code"
                    isInvalid={state.meta.errors.length > 0}
                    errorMessage={state.meta.errors
                      .map((e) => e?.message)
                      .join(', ')}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
              )}
            </backupCodeForm.Field>
            <backupCodeForm.Subscribe
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
            </backupCodeForm.Subscribe>
          </form>
        )}
        <p className="text-sm px-2 opacity-80">
          {!useBackupCode ? "Can't access the code? Use" : ''}
          <Button
            color="primary"
            variant="light"
            className="mx-auto"
            onClick={() => {
              setUseBackupCode((s) => !s)
            }}
          >
            {!useBackupCode ? 'Backup Code' : 'Go Back'}
          </Button>
        </p>
      </ModalContent>
    </Modal>
  )
}

export default Verify2FaCode
