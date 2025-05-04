import {
  Slider as NextUISlider,
  type SliderProps as NextUISliderProps,
} from '@heroui/react'
import React from 'react'

interface SliderProps extends NextUISliderProps {}

function Slider(props: SliderProps) {
  return <NextUISlider {...props} />
}

export default Slider
