import React, { lazy, Suspense } from 'react'

import registry from './registry'

export interface IconProps {
  name: keyof typeof registry
  size?: number
  className?: string
}

function Icon(props: IconProps & React.SVGProps<SVGElement>) {
  const { name, size = 20, className } = props

  const icon = registry[name]

  if (icon == null) {
    // eslint-disable-next-line no-console
    console.warn(`No such icon named ${name}`)
    return null
  }

  const LazyIcon = lazy(icon)

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: `${size / 20}rem`,
            height: `${size / 20}rem`,
          }}
        />
      }
    >
      <LazyIcon
        className={className}
        style={{ width: `${size / 20}rem`, height: `${size / 20}rem` }}
      />
    </Suspense>
  )
}

export default Icon
