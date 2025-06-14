import {
  Avatar as NextUIAvatar,
  type AvatarProps as NextUIAvatarProps,
} from '@heroui/react'
import React from 'react'
import { handleFileUrl } from 'src/utils/file'
import Image from '../Image'

export interface AvatarProps extends NextUIAvatarProps {}

function Avatar(props: AvatarProps) {
  return (
    <NextUIAvatar
      {...props}
      // There's some issue with image not loading on update. That's why we needed to explicitly assign a image component
      ImgComponent={(...p) => (
        <Image
          src={props?.src!}
          alt={props?.alt!}
          className="object-cover w-full h-full"
          removeWrapper
          {...p}
          {...(props?.disableAnimation
            ? { disableAnimation: props?.disableAnimation }
            : {})}
        />
      )}
      src={handleFileUrl(props?.src!)}
    />
  )
}

export default Avatar
