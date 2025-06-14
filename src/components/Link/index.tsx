import { Link as NextLink, LinkProps as NextLinkProps } from '@heroui/react'
import {
  Link as NativeLink,
  type LinkProps as LProps,
} from '@tanstack/react-router'
import { forwardRef } from 'react'

interface LinkProps extends LProps {
  href?: LProps['to']
  to?: LProps['to']
}

const NativeLinkRenderer = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => (
    <NativeLink
      {...props}
      ref={ref}
      to={(props.to as any) ?? (props.href as any)}
    />
  ),
)

function Link(props: LinkProps & Omit<NextLinkProps, 'href'>) {
  const { href, to, ...nextLinkProps } = props
  return <NextLink as={NativeLinkRenderer} {...nextLinkProps} to={href ?? to} />
}

export default Link
