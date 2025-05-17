import {
  Skeleton as NextUISkeleton,
  type SkeletonProps as NextUISkeletonProps,
} from '@heroui/react'
import React from 'react'

interface SkeletonProps extends NextUISkeletonProps {}

function Skeleton(props: SkeletonProps) {
  return <NextUISkeleton {...props} />
}

export default Skeleton
