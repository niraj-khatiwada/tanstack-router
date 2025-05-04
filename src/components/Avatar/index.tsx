import {
  Avatar as NextUIAvatar,
  type AvatarProps as NextUIAvatarProps,
} from '@heroui/react'
import React from 'react'

interface AvatarProps extends NextUIAvatarProps {}

function Avatar(props: AvatarProps) {
  return <NextUIAvatar {...props} />
}

export default Avatar
