import {
  Modal as NextUIModal,
  ModalBody as NextUIModalBody,
  ModalContent as NextUIModalContent,
  ModalFooter as NextUIModalFooter,
  ModalHeader as NextUIModalHeader,
  type ModalBodyProps as NextUIModalBodyProps,
  type ModalContentProps as NextUIModalContentProps,
  type ModalFooterProps as NextUIModalFooterProps,
  type ModalHeaderProps as NextUIModalHeaderProps,
  type ModalProps as NextUIModalProps,
} from '@heroui/react'
import React from 'react'
import { BackdropBlurContent } from 'src/ui/backdrop-blur'
import { cn } from 'src/utils/tailwind'
import { bottomToTop, zoomIn } from './modal.animation'

export interface ModalProps extends NextUIModalProps {
  motionVariant?: 'zoomIn' | 'bottomToTop'
}
function Modal({ motionVariant, ...props }: ModalProps) {
  return (
    <NextUIModal
      hideCloseButton
      motionProps={{
        variants: { zoomIn, bottomToTop }?.[motionVariant ?? 'zoomIn'],
      }}
      {...props}
    />
  )
}

interface ModalHeaderProps extends NextUIModalHeaderProps {}
export function ModalHeader(props: ModalHeaderProps) {
  return <NextUIModalHeader {...props} />
}

interface ModalBodyProps extends NextUIModalBodyProps {}
export function ModalBody(props: ModalBodyProps) {
  return <NextUIModalBody {...props} />
}

interface ModalContentProps extends NextUIModalContentProps {
  children: React.ReactNode
}
export function ModalContent(props: ModalContentProps) {
  return (
    <NextUIModalContent
      {...props}
      className={cn(['relative bg-transparent', props?.className])}
    >
      {props?.children}
      <BackdropBlurContent />
    </NextUIModalContent>
  )
}

interface ModalFooterProps extends NextUIModalFooterProps {}
export function ModalFooter(props: ModalFooterProps) {
  return <NextUIModalFooter {...props} />
}

export default Modal
