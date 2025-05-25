import { useForm } from '@tanstack/react-form'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '~/components/Button'
import Icon from '~/components/Icon'
import TextInput from '~/components/Input/TextInput'
import { auth } from '~/libs/auth'

const passKeysSchema = z.object({
  name: z.string().min(1).max(30),
})

type PassKeysSchema = z.infer<typeof passKeysSchema>

function PassKeys() {
  const [addNewKey, setAddNewKey] = useState(false)
  const [isDeletePasskeyPending, setIsDeletePasskeyPending] = useState(false)

  const { data: passKeys, refetch: refetchPassKeys } = auth.useListPasskeys()

  const form = useForm({
    defaultValues: {
      name: '',
    } as PassKeysSchema,
    validators: {
      onSubmit: passKeysSchema,
    },
    async onSubmit({ value }) {
      try {
        const res = await auth.passkey.addPasskey({
          name: value.name,
        })
        if (res?.error) {
          const message = res.error?.message ?? 'Something went wrong...'
          toast.error(message)
          return
        }
        form.reset()
        refetchPassKeys?.()
        toast.success('Passkey added successfully.')
      } catch (error: any) {
        toast.error(error?.message ?? 'Something went wrong...')
      }
    },
  })

  const handleDeletePassKey = async (id: string) => {
    try {
      setIsDeletePasskeyPending(true)
      const { error } = await auth.passkey.deletePasskey({
        id,
      })
      if (error) {
        const message = error?.message ?? 'Something went wrong...'
        toast.error(message)
        return
      }
      refetchPassKeys?.()
      toast.success('Passkey deleted successfully.')
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong...')
    } finally {
      setIsDeletePasskeyPending(false)
    }
  }

  return (
    <div className="max-w-[30rem] py-4 px-4">
      <h3 className="text-lg font-bold mb-4">Pass Keys</h3>
      {!addNewKey ? (
        <div className="mb-4">
          {passKeys?.map((passkey) => (
            <div
              key={passkey.id}
              className="bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-lg flex items-center justify-between"
            >
              <p className="font-bold text-primary">{passkey.name ?? ''}</p>
              <Button
                isIconOnly
                onClick={() => {
                  handleDeletePassKey(passkey.id)
                }}
                isLoading={isDeletePasskeyPending}
                isDisabled={isDeletePasskeyPending}
              >
                <Icon name="trash" className="text-red-400" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
      {!addNewKey ? (
        <Button
          onClick={() => {
            setAddNewKey(true)
          }}
        >
          Add New Key
        </Button>
      ) : null}
      {addNewKey ? (
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field name="name">
            {({ state, handleChange }) => (
              <TextInput
                value={state.value}
                placeholder="Enter your passkey name"
                isInvalid={state.meta.errors.length > 0}
                errorMessage={state.meta.errors
                  .map((e) => e?.message)
                  .join(', ')}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
              isDirty: state.isDirty,
            })}
          >
            {({ canSubmit, isSubmitting, isDirty }) => (
              <Button
                size="sm"
                type="submit"
                className="bg-primary text-white py-2 rounded-xl"
                isDisabled={!canSubmit || !isDirty}
                isLoading={isSubmitting}
              >
                Create
              </Button>
            )}
          </form.Subscribe>
        </form>
      ) : null}
    </div>
  )
}

export default PassKeys
