import React, { useState } from 'react'
import { toast } from 'sonner'

import { useDisclosure } from '@heroui/react'
import Button from '~/components/Button'
import Snippet from '~/components/Snippet'
import useCurrentSession from '~/hooks/useCurrentSession'
import { auth } from '~/libs/auth'
import AlertDialog from '~/ui/dialogs/AlertDialog'
import OTPQrCode from './OTPQrCode'
import VerifyPassword from './VerifyPassword'

function TwoFactorAuth() {
  const { data: currentSession, refetch: refetchSession } = useCurrentSession()
  const isEnabled = currentSession?.user?.twoFactorEnabled

  const showBackupCodeDiscloser = useDisclosure()

  const [mode, setMode] = useState<'enable' | 'disable' | 'new-qr-code' | null>(
    null,
  )
  const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState<string | null>(
    null,
  )
  const [backupCodes, setBackupCodes] = useState<string[]>([])

  const handleVerifyPassword = async ({ password }: { password: string }) => {
    try {
      if (mode === 'enable') {
        const { data, error } = await auth.twoFactor.enable({
          password,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        setTwoFactorVerifyURI(data.totpURI)
        setBackupCodes(data.backupCodes)
      } else if (mode === 'new-qr-code') {
        const { data, error } = await auth.twoFactor.getTotpUri({
          password,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        setTwoFactorVerifyURI(data.totpURI)
      } else if (mode === 'disable') {
        const { error } = await auth.twoFactor.disable({
          password,
        })
        if (error) {
          toast.error(error?.message ?? '')
          return
        }
        setMode(null)
        toast.success('Two factor authentication disabled successfully.')
        await refetchSession?.()
      }
    } catch (error: any) {
      toast.error(error?.message ?? '')
    }
  }

  const handleVerifyOTP = async ({ otp }: { otp: string }) => {
    try {
      const { error } = await auth.twoFactor.verifyTotp({
        code: otp,
      })
      if (error) {
        toast.error(error?.message ?? '')
        return
      }
      if (backupCodes.length > 0) {
        showBackupCodeDiscloser.onOpen()
      }
      setMode(null)
      toast.success('Two factor authentication enabled successfully.')
      await refetchSession?.()
    } catch (error: any) {
      toast.error(error?.message ?? '')
    }
  }

  return (
    <div className="max-w-[30rem] py-4 px-4">
      <h3 className="text-lg font-bold mb-1">Two Factor Authentication</h3>
      <p className="mb-4 text-sm italic opacity-70">
        2FA is currently {isEnabled ? 'enabled' : 'disabled'}.
      </p>
      <div>
        {mode == null ? (
          <div className="flex items-center gap-2">
            {isEnabled ? (
              <Button
                size="sm"
                onClick={() => {
                  setMode('new-qr-code')
                }}
              >
                Scan QR Code
              </Button>
            ) : null}
            <Button
              size="sm"
              color={!isEnabled ? 'success' : 'danger'}
              onClick={() => {
                setMode(isEnabled ? 'disable' : 'enable')
              }}
            >
              {!isEnabled ? 'Enable' : 'Disable'}
            </Button>
          </div>
        ) : mode !== null ? (
          twoFactorVerifyURI == null ? (
            <>
              <p className="text-sm mb-1">
                {(
                  {
                    enable: 'Enable 2fa:',
                    disable: 'Disable 2fa:',
                    'new-qr-code': 'Add new 2fa QR code:',
                  } as Record<typeof mode, string>
                )[mode] ?? ''}
              </p>
              <VerifyPassword onSubmit={handleVerifyPassword} />
            </>
          ) : (
            <div className="w-full my-6">
              <OTPQrCode
                url={twoFactorVerifyURI}
                disableOTPVerification={mode === 'new-qr-code'}
                onVerificationSubmit={handleVerifyOTP}
              />
              {mode === 'new-qr-code' ? (
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    refetchSession?.()
                    setMode(null)
                  }}
                >
                  Done
                </Button>
              ) : null}
            </div>
          )
        ) : null}
      </div>
      <AlertDialog
        alertType="info"
        title="Save your backup codes"
        description={
          <div className="px-4">
            <p className="text-center text-sm">
              You can use each of these backup codes once to recover your
              account.
            </p>
            <Snippet className="w-full my-2" symbol={false}>
              {backupCodes.map((c) => (
                <p key={c}>{c}</p>
              ))}
            </Snippet>
          </div>
        }
        discloser={showBackupCodeDiscloser}
        renderFooter={({ closeModal }) => (
          <Button
            onPress={() => {
              closeModal?.()
            }}
            className="p-0 m-0 w-full"
          >
            OK
          </Button>
        )}
        modalProps={{ backdrop: 'blur' }}
      />
    </div>
  )
}

export default TwoFactorAuth
