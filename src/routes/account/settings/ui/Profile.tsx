import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { FileDto } from '~/api/gen'
import {
  fileControllerUploadFileMutation,
  userControllerGetCurrentUserOptions,
  userControllerUpdateUserProfileMutation,
} from '~/api/gen/@tanstack/react-query.gen'
import Button from '~/components/Button'
import FileInput from '~/components/Input/FileInput'
import TextInput from '~/components/Input/TextInput'
import Skeleton from '~/components/Skeleton'
import { auth } from '~/libs/auth'
import { cn } from '~/utils/tailwind'

const profileSchema = z.object({
  email: z.string().email().readonly(),
  username: z.string().min(3),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  image: z.string().optional(),
  imageFile: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Only image files are allowed',
    })
    .nullable()
    .optional(),
})

type ProfileSchema = z.infer<typeof profileSchema>

function Profile() {
  const queryClient = useQueryClient()

  const getCurrentUserOptions = userControllerGetCurrentUserOptions()
  const { data: user, isFetched } = useQuery({
    ...getCurrentUserOptions,
  })

  const { mutateAsync: uploadFile } = useMutation(
    fileControllerUploadFileMutation(),
  )

  const { mutateAsync: updateProfile } = useMutation(
    userControllerUpdateUserProfileMutation(),
  )

  const form = useForm({
    defaultValues: {
      email: user?.email ?? '',
      username: user?.username ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      image: user?.image ?? '',
      imageFile: null,
    } as ProfileSchema,
    validators: {
      onSubmit: profileSchema,
    },
    async onSubmit({ value }) {
      try {
        let fileResponse: FileDto | null = null
        if (value.imageFile) {
          fileResponse = await uploadFile({ body: { file: value.imageFile } })
        }
        await updateProfile({
          body: {
            username: value.username,
            firstName: value.firstName,
            lastName: value.lastName,
            image:
              value.imageFile && fileResponse ? fileResponse.filename : null,
          },
        })
        queryClient.invalidateQueries({
          queryKey: [...getCurrentUserOptions.queryKey],
        })
        toast.success('Profile updated successfully.')
        auth.getSession()
      } catch (error: any) {
        toast.error(error?.message ?? '')
      }
    },
  })

  return (
    <div className="max-w-[30rem] py-4 px-4">
      <h3 className="text-lg font-bold mb-4">Profile Settings</h3>
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <Skeleton
          className={cn(
            'rounded-full w-[5rem]',
            !isFetched ? 'h-[5rem] mb-2' : '',
          )}
          isLoaded={isFetched}
        >
          <form.Field name="imageFile">
            {({ state, handleChange }) => (
              <form.Subscribe selector={(s) => s.values.image}>
                {(image) => (
                  <FileInput
                    type="image"
                    renderMode="avatar"
                    avatarProps={{ src: image }}
                    value={state.value!}
                    placeholder="Profile Image"
                    isInvalid={state.meta.errors.length > 0}
                    errorMessage={state.meta.errors
                      .map((e) => e?.message)
                      .join(', ')}
                    onFileChange={(file) => {
                      handleChange(file)
                      if (file === null) {
                        form.setFieldValue('image', '')
                      }
                    }}
                  />
                )}
              </form.Subscribe>
            )}
          </form.Field>
        </Skeleton>
        <Skeleton className="rounded-xl" isLoaded={isFetched}>
          <form.Field name="email">
            {({ state }) => (
              <TextInput
                value={state.value}
                label="Email"
                placeholder="Email"
                isDisabled
              />
            )}
          </form.Field>
        </Skeleton>
        <Skeleton className="rounded-xl" isLoaded={isFetched}>
          <form.Field name="username">
            {({ state, handleChange }) => (
              <TextInput
                value={state.value}
                label="Username"
                placeholder="Username"
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </Skeleton>
        <Skeleton className="rounded-xl" isLoaded={isFetched}>
          <form.Field name="firstName">
            {({ state, handleChange }) => (
              <TextInput
                value={state.value}
                label="First Name"
                placeholder="First Name"
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </Skeleton>
        <Skeleton className="rounded-xl" isLoaded={isFetched}>
          <form.Field name="lastName">
            {({ state, handleChange }) => (
              <TextInput
                value={state.value}
                label="Last Name"
                placeholder="Last Name"
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </Skeleton>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            isDirty: state.isDirty,
          })}
        >
          {({ canSubmit, isSubmitting, isDirty }) => (
            <Button
              type="submit"
              className="bg-primary text-white py-2 rounded-xl"
              isDisabled={!canSubmit || !isDirty}
              isLoading={isSubmitting}
              size="sm"
            >
              Save
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}

export default Profile
