import {
  Input as NextUIInput,
  type InputProps as NextUIInputProps,
} from '@heroui/react'
import { useRef, useState } from 'react'
import { cn } from '~/utils/tailwind'
import Avatar, { AvatarProps } from '../Avatar'
import Button from '../Button'
import Icon from '../Icon'
import Image from '../Image'

interface FileInputPros extends Omit<NextUIInputProps, 'file' | 'value'> {
  value?: File
  type?: 'image'
  renderMode?: 'native' | 'avatar'
  onFileChange?: (file: File | null) => void
  avatarProps?: AvatarProps
}

const MIME_TYPES = { image: 'image/png, image/jpg, image/jpeg' } as const

function FileInput(props: FileInputPros) {
  const {
    type = 'image',
    onFileChange,
    value,
    renderMode = 'native',
    avatarProps,
    ..._props
  } = props

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onFileChange?.(null)
    setPreviewImageUrl(null)
  }

  return (
    <>
      {renderMode === 'avatar' ? (
        <Button
          className="w-[unset] h-[unset] p-0 bg-none! overflow-visible"
          onPress={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click?.()
            }
          }}
        >
          <Avatar
            alt="profile"
            className="w-[5rem] h-[5rem]"
            {...avatarProps}
            src={previewImageUrl! ?? avatarProps?.src!}
          />
          {value || avatarProps?.src ? (
            <Button
              isIconOnly
              className="absolute top-0 right-0 min-w-0 min-h-0 p-1 w-fit h-fit"
              onPress={handleFileRemove}
              variant="solid"
            >
              <Icon name="cross" />
            </Button>
          ) : null}
        </Button>
      ) : null}
      <NextUIInput
        accept={MIME_TYPES?.[type]}
        type="file"
        {..._props}
        ref={fileInputRef}
        className={cn(['w-fit hidden', _props?.className])}
        onChange={(evt) => {
          _props?.onChange?.(evt)
          const file = evt.target.files?.[0]
          if (file) {
            onFileChange?.(file)
            if (type === 'image' && file.type.startsWith('image/')) {
              setPreviewImageUrl(URL.createObjectURL(file))
            }
          }
        }}
        endContent={
          value ? (
            <Button
              isIconOnly
              variant="light"
              onPress={handleFileRemove}
              size="sm"
            >
              <Icon name="cross" />
            </Button>
          ) : null
        }
      />
      {renderMode === 'native' && previewImageUrl ? (
        <Image
          alt="image-preview"
          src={previewImageUrl}
          className="w-[8rem] h-[8rem] object-contain"
        />
      ) : null}
    </>
  )
}

export default FileInput
