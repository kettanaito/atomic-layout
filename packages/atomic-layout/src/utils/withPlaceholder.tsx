import * as React from 'react'
import { Breakpoint, AreaComponent, GenericProps } from '@atomic-layout/core'
import { forwardRef } from './forwardRef'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * Wraps the given area component in a placeholder component.
 * This is used for conditional components, where placeholder component is rendered
 * until the condition for that area component is met (i.e. viewport matches a breakpoint).
 */
export const withPlaceholder = (
  Component: AreaComponent,
  breakpoints: Breakpoint[],
) => {
  const Placeholder = forwardRef<unknown, GenericProps>(
    ({ children, ...restProps }, ref) => {
      const matches = useMediaQuery(breakpoints)
      return (
        matches && (
          <Component ref={ref} {...restProps}>
            {children}
          </Component>
        )
      )
    },
  )

  Placeholder.displayName = `Placeholder(${Component.displayName})`

  return Placeholder
}
