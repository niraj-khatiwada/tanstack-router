import { Link as NextLink, LinkProps as NextLinkProps } from '@heroui/react'
import {
  Link as NativeLink,
  type LinkProps as LProps,
} from '@tanstack/react-router'
import React from 'react'

interface LinkProps extends LProps {
  href?: LProps['to']
  to?: LProps['to']
}

function NativeLinkRenderer(props: LProps) {
  return <NativeLink to={props.to! as any} {...props} />
}

function Link(props: LinkProps & Omit<NextLinkProps, 'href'>) {
  const { href, to, ...nextLinkProps } = props
  return <NextLink as={NativeLinkRenderer} {...nextLinkProps} to={href ?? to} />
}

export default Link
