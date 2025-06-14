import {
  Spinner as NextUISpinner,
  type SpinnerProps as NextUISpinnerProps,
} from '@heroui/react'

interface SpinnerPros extends NextUISpinnerProps {}

function Spinner(props: SpinnerPros) {
  return <NextUISpinner size="sm" {...props} />
}

export default Spinner
