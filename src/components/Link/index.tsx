import { Link as NextLink, LinkProps as NextLinkProps } from '@heroui/react'
import {
  Link as NativeLink,
  type LinkProps as LProps,
} from '@tanstack/react-router'
import React from 'react'

interface LinkProps {
  href?: LProps['to']
  to?: LProps['to']
}

function Link(props: LinkProps & Omit<NextLinkProps, 'href'>) {
  const { ...nextLinkProps } = props
  return (
    <NextLink
      as={NativeLink}
      {...nextLinkProps}
      href={props.href ?? props.to}
    />
  )
}

export default Link
