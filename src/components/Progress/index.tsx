import {
  CircularProgress as NextUICircularProgress,
  type CircularProgressProps as NextUICircularProgressProps,
} from '@heroui/react'
import React from 'react'

interface CircularProgressProps extends NextUICircularProgressProps {}

function CircularProgress(props: CircularProgressProps) {
  return <NextUICircularProgress {...props} />
}

export default CircularProgress
