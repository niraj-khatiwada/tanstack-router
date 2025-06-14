export type ThemeVariant = 'light' | 'dark'

export type ThemeStore = {
  theme: ThemeVariant
  setTheme: (newTheme: ThemeVariant) => void
  toggleTheme: () => void
}
