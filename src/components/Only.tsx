import * as React from 'react'
import MediaQuery from 'react-responsive'
import { Breakpoint } from '../const/defaultOptions'
import { GenericProps } from '../const/props'
import Layout from '../Layout'
import Box from './Box'
import openBreakpoint from '../utils/breakpoints/openBreakpoint'
import closeBreakpoint from '../utils/breakpoints/closeBreakpoint'

// const breakpointNames = Layout.getBreakpointNames()

export interface OnlyProps extends GenericProps {
  for?: string
  from?: string
  to?: string
}

const wrapInQuery = (
  children: React.ReactNode,
  breakpointOptions: Breakpoint,
  containerProps: GenericProps,
) => (
  <MediaQuery {...breakpointOptions}>
    <Box {...containerProps}>{children}</Box>
  </MediaQuery>
)

const Only: React.FunctionComponent<OnlyProps> = ({
  children,
  for: explicitBreakpointName,
  from: fromBreakpointName,
  to: toBreakpointName,
  ...restProps
}) => {
  /* Render on explicit breakpoint */
  if (explicitBreakpointName) {
    return wrapInQuery(
      children,
      Layout.getBreakpoint(explicitBreakpointName),
      restProps,
    )
  }

  const fromBreakpoint = Layout.getBreakpoint(fromBreakpointName)
  const toBreakpoint = Layout.getBreakpoint(toBreakpointName)

  /* High-pass, __/-- */
  if (fromBreakpoint && !toBreakpoint) {
    return wrapInQuery(children, openBreakpoint(fromBreakpoint), restProps)
  }

  /* Low-pass, --\__ */
  if (toBreakpoint && !fromBreakpoint) {
    return wrapInQuery(children, closeBreakpoint(toBreakpoint), restProps)
  }

  /**
   * @todo
   * Add inclusive and notch behavior.
   */
  return (
    <p>Sorry, inclusive and notch behaviors are not currently supported.</p>
  )
}

export default Only
