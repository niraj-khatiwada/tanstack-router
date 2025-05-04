import {
  Input as NextUIInput,
  type InputProps as NextUIInputProps,
} from '@heroui/react'

interface TextInputPros extends NextUIInputProps {}

function TextInput(props: TextInputPros) {
  return <NextUIInput {...props} />
}

export default TextInput
