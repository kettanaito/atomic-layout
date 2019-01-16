import * as React from 'react'
import { Breakpoint } from '../const/defaultOptions'
import { GenericProps } from '../const/props'
import Layout from '../Layout'
import Box from './Box'
import { wrapInPlaceholder } from '../utils/templates/generateComponents'
import openBreakpoint from '../utils/breakpoints/openBreakpoint'
import closeBreakpoint from '../utils/breakpoints/closeBreakpoint'
import mergeBreakpoints from '../utils/breakpoints/mergeBreakpoints'

export interface OnlyProps extends GenericProps {
  /**
   * Renders children only at the specified breakpoint.
   */
  for?: string
  /**
   * Renders children from the specified breakpoint and up,
   * unless enclosing `to` prop is set to form a range.
   */
  from?: string
  /**
   * Renders children from the specified breakpoint and down,
   * unless the openning `from` prop is set to form a range.
   */
  to?: string
  /**
   * Renders children everywhere except the given breakpoint range.
   */
  except?: boolean
}

const createWrapper = (children: React.ReactNode, props: GenericProps) => (
  ...areaParams: Breakpoint[]
) => {
  const Placeholder = wrapInPlaceholder(Box, areaParams)
  return <Placeholder {...props}>{children}</Placeholder>
}

const Only = ({
  children,
  except,
  for: exactBreakpointName,
  from: minBreakpointName,
  to: maxBreakpointName,
  ...restProps
}: { children: React.ReactNode } & OnlyProps): React.ReactNode => {
  const wrapWith = createWrapper(children, restProps)

  /* Render on explicit breakpoint */
  if (exactBreakpointName) {
    return wrapWith(Layout.getBreakpoint(exactBreakpointName))
  }

  const minBreakpoint = Layout.getBreakpoint(minBreakpointName)
  const maxBreakpoint = Layout.getBreakpoint(maxBreakpointName)

  /* Inclusive, __/--\__ */
  if (minBreakpoint && maxBreakpoint && !except) {
    return wrapWith(
      mergeBreakpoints(
        { behavior: 'up', ...minBreakpoint },
        { behavior: 'down', ...maxBreakpoint },
        true,
      ),
    )
  }

  /* Notch, --\__/-- */
  if (minBreakpoint && maxBreakpoint && except) {
    return wrapWith(
      closeBreakpoint(minBreakpoint),
      null,
      openBreakpoint(maxBreakpoint),
    )
  }

  /* High-pass, __/-- */
  if (minBreakpoint && !maxBreakpoint) {
    return wrapWith(openBreakpoint(minBreakpoint))
  }

  /* Low-pass, --\__ */
  if (maxBreakpoint && !minBreakpoint) {
    return wrapWith(closeBreakpoint(maxBreakpoint))
  }

  /* Render always when no constrains are provided */
  return children
}

export default Only
