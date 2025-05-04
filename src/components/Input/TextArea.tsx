import {
  Textarea as NextUITextArea,
  TextAreaProps as NextUITextAreaProps,
} from '@heroui/react'

interface TextAreaPros extends NextUITextAreaProps {}

function TextArea(props: TextAreaPros) {
  return <NextUITextArea {...props} />
}

export default TextArea
