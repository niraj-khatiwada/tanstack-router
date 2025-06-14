import { useLoaderData, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { setThemeServerFn, toggleThemeServerFn } from '~/server/functions/theme'
import { ThemeVariant } from '~/types/theme'
import { getCookie } from '~/utils/cookie'

export function useTheme() {
  const router = useRouter()

  const themeFromServer = useLoaderData({ from: '__root__' })

  const [theme, setTheme] = useState(() =>
    typeof window === 'undefined'
      ? themeFromServer
      : (getCookie('theme') as ThemeVariant),
  )

  const _setTheme = (variant: ThemeVariant) => {
    setTheme(variant)
    setThemeServerFn({ data: variant }).then(() => router.invalidate())
  }

  const toggleTheme = () => {
    toggleThemeServerFn().then((value) => {
      setTheme(value)
      router.invalidate()
    })
  }

  return { theme, setTheme: _setTheme, toggleTheme }
}
