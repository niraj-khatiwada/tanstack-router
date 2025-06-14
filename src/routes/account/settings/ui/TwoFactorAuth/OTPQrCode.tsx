import { useForm } from '@tanstack/react-form'
import React from 'react'
import QRCode from 'react-qr-code'
import { z } from 'zod'

import Button from '~/components/Button'
import TextInput from '~/components/Input/TextInput'
import Snippet from '~/components/Snippet'

const verifyOTPSchema = z.object({
  otp: z.string().min(1),
})

type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>

type OTPQrCodeProps = {
  url: string
  disableOTPVerification?: boolean
  onVerificationSubmit?: (_: { otp: string }) => Promise<void> | void
}

function OTPQrCode({
  url,
  disableOTPVerification,
  onVerificationSubmit,
}: OTPQrCodeProps) {
  const form = useForm({
    defaultValues: {
      otp: '',
    } as VerifyOTPSchema,
    validators: {
      onSubmit: verifyOTPSchema,
    },
    async onSubmit({ value }) {
      await onVerificationSubmit?.({ otp: value.otp })
      form.reset()
    },
  })

  return (
    <>
      <div className="border-1 border-primary rounded-2xl p-4 shrink-0 w-fit flex justify-center flex-col items-center space-y-4">
        <QRCode value={url ?? ''} />
        <Snippet
          className="pl-4 w-fit"
          size="sm"
          codeString={url ?? ''}
          hideSymbol
        >
          Copy to clipboard
        </Snippet>
      </div>
      <p className="mt-4 text-sm max-w-[20rem]">
        Scan this QR code with your 2FA app
      </p>
      {!disableOTPVerification ? (
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4 my-4"
        >
          <form.Field name="otp">
            {({ state, handleChange }) => (
              <TextInput
                value={state.value}
                placeholder="Enter your code"
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
                size="sm"
                type="submit"
                className="bg-primary text-white py-2 rounded-xl"
                isDisabled={!canSubmit || !isDirty}
                isLoading={isSubmitting}
              >
                Enable Now
              </Button>
            )}
          </form.Subscribe>
        </form>
      ) : null}
    </>
  )
}

export default OTPQrCode
