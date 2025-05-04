import {
  Button as NextButton,
  type ButtonProps as NextButtonProps,
} from '@heroui/react'
import { ClassValue } from 'clsx'
import React from 'react'

import { cn } from '~/utils/tailwind'

export interface ButtonProps extends Omit<NextButtonProps, 'className'> {
  color?: NextButtonProps['color']
  variant?: NextButtonProps['variant']
  className?: ClassValue
}

const Button = React.forwardRef(
  (props: ButtonProps, ref: NextButtonProps['ref']) => {
    const { color, variant, className, ...nextButtonProps } = props

    return (
      <NextButton
        ref={ref}
        disableRipple
        color={color ?? 'default'}
        variant={variant ?? 'flat'}
        {...nextButtonProps}
        className={cn(['font-medium', className])}
      />
    )
  },
)
Button.displayName = 'Button'

export default Button
