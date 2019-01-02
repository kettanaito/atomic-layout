import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import Layout from '../Layout'
import Box from './Box'
import openBreakpoint from '../utils/breakpoints/openBreakpoint'
import closeBreakpoint from '../utils/breakpoints/closeBreakpoint'

const breakpointNames = Layout.getBreakpointNames()

const wrapInQuery = (children, breakpointOptions, containerProps) => (
  <MediaQuery {...breakpointOptions}>
    <Box {...containerProps}>{children}</Box>
  </MediaQuery>
)

const Only = ({
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

Only.propTypes = {
  /**
   * @todo
   * Support an Object as the value to provide a
   * custom breakpoint (not listed in `Layout.breakpoints`).
   */
  for: PropTypes.oneOf(breakpointNames),
  from: PropTypes.oneOf(breakpointNames),
  to: PropTypes.oneOf(breakpointNames),
}

export default Only
