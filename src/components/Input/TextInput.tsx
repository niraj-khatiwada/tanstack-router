import {
  Input as NextUIInput,
  type InputProps as NextUIInputProps,
} from '@heroui/react'

interface TextInputPros extends NextUIInputProps {}

function TextInput(props: TextInputPros) {
  return <NextUIInput size="sm" {...props} />
}

export default TextInput
