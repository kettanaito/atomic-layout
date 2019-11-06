import * as React from 'react'
import Layout from '../Layout'
import Box, { BoxProps } from './Box'
import { Breakpoint } from '@const/defaultOptions'
import { withPlaceholder } from '@utils/templates/generateComponents'
import openBreakpoint from '@utils/breakpoints/openBreakpoint'
import closeBreakpoint from '@utils/breakpoints/closeBreakpoint'
import mergeAreaRecords from '@utils/breakpoints/mergeAreaRecords'

export type BreakpointRef = string | Breakpoint

const resolveBreakpoint = (breakpointRef: BreakpointRef): Breakpoint => {
  return typeof breakpointRef === 'string'
    ? Layout.breakpoints[breakpointRef]
    : breakpointRef
}

export interface OnlyProps extends BoxProps {
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

const createWrapper = (children: React.ReactNode, props: BoxProps) => (
  ...breakpoints: Breakpoint[]
) => {
  const Placeholder = withPlaceholder(Box, breakpoints)
  return <Placeholder {...props}>{children}</Placeholder>
}

const Only: React.FC<OnlyProps> = ({
  children,
  except,
  for: exactBreakpointName,
  from: minBreakpointName,
  to: maxBreakpointName,
  ...restProps
}) => {
  const wrapWith = createWrapper(children, restProps)

  // Render on explicit breakpoint
  if (exactBreakpointName) {
    return wrapWith(resolveBreakpoint(exactBreakpointName))
  }

  const minBreakpoint = resolveBreakpoint(minBreakpointName)
  const maxBreakpoint = resolveBreakpoint(maxBreakpointName)

  // Bell, __/--\__
  if (minBreakpoint && maxBreakpoint && !except) {
    const mergedAreaRecord = mergeAreaRecords(
      {
        behavior: 'down',
        breakpoint: maxBreakpoint,
      },
      {
        behavior: 'up',
        breakpoint: minBreakpoint,
      },
      false,
    )

    return wrapWith(mergedAreaRecord.breakpoint)
  }

  // Notch, --\__/--
  if (minBreakpoint && maxBreakpoint && except) {
    return wrapWith(
      closeBreakpoint(minBreakpoint),
      openBreakpoint(maxBreakpoint),
    )
  }

  // High-pass, __/--
  if (minBreakpoint && !maxBreakpoint) {
    return wrapWith(openBreakpoint(minBreakpoint))
  }

  // Low-pass, --\__
  if (!minBreakpoint && maxBreakpoint) {
    return wrapWith(closeBreakpoint(maxBreakpoint))
  }

  // Render always when no constrains are provided
  return <>children</>
}

export default Only
