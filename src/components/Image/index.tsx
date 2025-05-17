import {
  Image as NextUIImage,
  type ImageProps as NextUIImageProps,
} from '@heroui/react'
import React from 'react'
import { handleFileUrl } from '~/utils/file'

interface ImageProps {
  src: string
  alt: string
}
function Image(props: ImageProps & Exclude<NextUIImageProps, 'src'>) {
  const { ...nextImageProps } = props

  const [isFallbackImage, setIsFallbackImage] = React.useState(false)
  return (
    <NextUIImage
      onLoadedData={() => {
        setIsFallbackImage(false)
      }}
      onError={() => {
        setIsFallbackImage(true)
      }}
      {...nextImageProps}
      src={handleFileUrl(props?.src)}
      {...(isFallbackImage
        ? {
            src:
              nextImageProps?.fallbackSrc?.toString() ?? '/default-blurred.jpg',
            fallbackSrc: null,
          }
        : {})}
    />
  )
}

export default Image
