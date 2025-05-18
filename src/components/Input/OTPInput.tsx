import {
  InputOtp as NextUIInputOTP,
  InputOtpProps as NextUIInputOTPProps,
} from '@heroui/react'

interface InputOTPPros extends NextUIInputOTPProps {}

function OTPInput(props: InputOTPPros) {
  return <NextUIInputOTP {...props} />
}

export default OTPInput
