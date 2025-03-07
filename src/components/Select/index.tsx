import {
  Select as NextUISelect,
  SelectItem as NextUISelectItem,
  type SelectItemProps as NextUISelectItemProps,
  type SelectProps as NextUISelectProps,
} from '@heroui/select'
import React from 'react'
import { blurCSS } from '~/ui/BackdropBlur'
import { getPlatform } from '~/utils/fs'
import { cn } from '~/utils/tailwind'

const { isWindows, isMacOS } = getPlatform()

interface SelectProps extends NextUISelectProps {}
function Select(props: SelectProps) {
  return (
    <NextUISelect
      radius="lg"
      {...props}
      classNames={{
        popoverContent: cn([
          isWindows || isMacOS ? blurCSS : '',
          props?.classNames?.popoverContent ?? '',
        ]),
        ...(props?.classNames ?? {}),
      }}
    />
  )
}

interface SelectItemProps extends NextUISelectItemProps {}
export function SelectItem(props: SelectItemProps) {
  return <NextUISelectItem {...props} />
}

export default Select
