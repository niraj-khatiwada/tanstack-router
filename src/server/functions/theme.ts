import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { z } from 'zod'
import { ThemeVariant } from '~/types/theme'

const THEME_KEY = 'theme'

const themeSchema = z.enum(['dark', 'light'])

export const getThemeServerFn = createServerFn().handler(async () => {
  let theme = getCookie(THEME_KEY) as ThemeVariant
  if (!theme) {
    theme = 'dark'
    setCookie(THEME_KEY, theme)
  }
  return theme
})

export const setThemeServerFn = createServerFn({ method: 'POST' })
  .validator((data: ThemeVariant) => {
    const rs = themeSchema.safeParse(data)
    if (rs.success) {
      return data
    }
    return 'dark'
  })
  .handler(async ({ data }) => {
    setCookie(THEME_KEY, data)
  })

export const toggleThemeServerFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const currentTheme = (getCookie(THEME_KEY) as ThemeVariant) ?? 'dark'
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setCookie(THEME_KEY, newTheme)
    return newTheme
  },
)
