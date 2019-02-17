import * as React from 'react'
import Layout from '../Layout'
import Box from './Box'
import { Breakpoint } from '@const/defaultOptions'
import { GenericProps } from '@const/props'
import { wrapInPlaceholder } from '@utils/templates/generateComponents'
import openBreakpoint from '@utils/breakpoints/openBreakpoint'
import closeBreakpoint from '@utils/breakpoints/closeBreakpoint'
import mergeBreakpoints from '@utils/breakpoints/mergeBreakpoints'

export type BreakpointRef = string | Breakpoint

export interface OnlyProps extends GenericProps {
  /**
   * Renders children only at the specified breakpoint.
   */
  for?: BreakpointRef
  /**
   * Renders children from the specified breakpoint and up,
   * unless enclosing `to` prop is set to form a range.
   */
  from?: BreakpointRef
  /**
   * Renders children from the specified breakpoint and down,
   * unless the openning `from` prop is set to form a range.
   */
  to?: BreakpointRef
  /**
   * Renders children everywhere except the given breakpoint range.
   */
  except?: boolean
}

const resolveBreakpoint = (breakpointRef: BreakpointRef): Breakpoint => {
  return typeof breakpointRef === 'string'
    ? Layout.getBreakpoint(breakpointRef)
    : breakpointRef
}

const createWrapper = (children: React.ReactNode, props: GenericProps) => (
  ...breakpoints: Breakpoint[]
) => {
  const Placeholder = wrapInPlaceholder(Box, breakpoints)
  return <Placeholder {...props}>{children}</Placeholder>
}

const Only = ({
  children,
  except,
  for: exactBreakpointName,
  from: minBreakpointName,
  to: maxBreakpointName,
  ...restProps
}: { children: any } & OnlyProps): JSX.Element => {
  const wrapWith = createWrapper(children, restProps)

  /* Render on explicit breakpoint */
  if (exactBreakpointName) {
    return wrapWith(resolveBreakpoint(exactBreakpointName))
  }

  const minBreakpoint = resolveBreakpoint(minBreakpointName)
  const maxBreakpoint = resolveBreakpoint(maxBreakpointName)

  /* Bell, __/--\__ */
  if (minBreakpoint && maxBreakpoint && !except) {
    return wrapWith(
      mergeBreakpoints(
        { behavior: 'down', ...maxBreakpoint },
        { behavior: 'up', ...minBreakpoint },
        false,
      ),
    )
  }

  /* Notch, --\__/-- */
  if (minBreakpoint && maxBreakpoint && except) {
    return wrapWith(
      closeBreakpoint(minBreakpoint),
      openBreakpoint(maxBreakpoint),
    )
  }

  /* High-pass, __/-- */
  if (minBreakpoint && !maxBreakpoint) {
    return wrapWith(openBreakpoint(minBreakpoint))
  }

  /* Low-pass, --\__ */
  if (!minBreakpoint && maxBreakpoint) {
    return wrapWith(closeBreakpoint(maxBreakpoint))
  }

  /* Render always when no constrains are provided */
  return children
}

export default Only
