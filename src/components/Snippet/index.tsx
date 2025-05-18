import {
  Snippet as NextUISnippet,
  type SnippetProps as NextUISnippetProps,
} from '@heroui/react'
import React from 'react'

interface SnippetProps extends NextUISnippetProps {}

function Snippet(props: SnippetProps) {
  return <NextUISnippet {...props} />
}

export default Snippet
