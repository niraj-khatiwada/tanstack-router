import {
  Checkbox as NextUICheckbox,
  type CheckboxProps as NextUICheckboxProps,
} from '@heroui/react'
import React from 'react'

interface CheckboxProps extends NextUICheckboxProps {}

function Checkbox(props: CheckboxProps) {
  return <NextUICheckbox {...props} />
}

export default Checkbox
