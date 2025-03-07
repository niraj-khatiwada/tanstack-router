import React from 'react'

import Button from '~/components/Button'
import Icon from '~/components/Icon'
import Tooltip from '~/components/Tooltip'
import { ThemeStore, useTheme } from '~/hooks/useTheme'

type ThemeSwitcherChildrenProps = ThemeStore

interface ThemeSwitcherProps {
  children?(props: ThemeSwitcherChildrenProps): React.ReactNode
}

function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { children } = props

  const { theme, setTheme, toggleTheme } = useTheme()

  return children == null ? (
    <Button
      isIconOnly
      size="sm"
      onPress={() => {
        toggleTheme()
      }}
    >
      <Tooltip
        content="Toggle theme"
        aria-label="Toggle theme"
        placement="right"
      >
        <Icon name={theme === 'light' ? 'moon' : 'sun'} />
      </Tooltip>
    </Button>
  ) : (
    children({ theme, setTheme, toggleTheme })
  )
}

export default ThemeSwitcher
