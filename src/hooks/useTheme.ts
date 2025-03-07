import { useEffect } from 'react'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as constants from '~/constants'

export type ThemeVariant = 'light' | 'dark'

export type ThemeStore = {
  theme: ThemeVariant
  setTheme: (newTheme: ThemeVariant) => void
  toggleTheme: () => void
}

let persistedTheme: ThemeVariant | null = localStorage.getItem(
  constants.theme,
) as ThemeVariant

if (persistedTheme && !['dark', 'light'].includes(persistedTheme)) {
  localStorage.removeItem(constants.theme)
  persistedTheme = null
}

const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector((set) => ({
    theme: persistedTheme ?? 'dark',
    setTheme(newTheme) {
      set((store) => ({ ...store, theme: newTheme }))
    },
    toggleTheme() {
      set((store) => ({
        ...store,
        theme: store.theme === 'dark' ? 'light' : 'dark',
      }))
    },
  })),
)

export function useTheme() {
  const themeStore = useThemeStore()

  const { theme } = themeStore

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const unsubscribe = useThemeStore.subscribe(
      (store) => store.theme,
      (newTheme) => {
        localStorage.setItem(constants.theme, newTheme)
      },
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return themeStore
}
