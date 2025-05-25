import {
  InputOtp as NextUIInputOTP,
  InputOtpProps as NextUIInputOTPProps,
} from '@heroui/react'

interface InputOTPPros extends NextUIInputOTPProps {}

function OTPInput(props: InputOTPPros) {
  return <NextUIInputOTP size="sm" {...props} />
}

export default OTPInput
