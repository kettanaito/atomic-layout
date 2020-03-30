import React from 'react'
import styled from 'styled-components'
import {
  openBreakpoint,
  closeBreakpoint,
  mergeAreaRecords,
} from '@atomic-layout/core'

import Box from './Box'
import { OnlyProps, resolveBreakpoint } from './Only'
import { useMediaQuery } from '../hooks/useMediaQuery'

const VisibleContainer = styled(Box)<{ matches: boolean }>`
  ${({ matches }) =>
    !matches &&
    `
      visibility: hidden;
    `}
`

const Visible: React.FC<OnlyProps> = ({
  children,
  except,
  for: exactBreakpointName,
  from: minBreakpointName,
  to: maxBreakpointName,
  ...boxProps
}) => {
  const exactBreakpoint = resolveBreakpoint(exactBreakpointName)
  const minBreakpoint = resolveBreakpoint(minBreakpointName)
  const maxBreakpoint = resolveBreakpoint(maxBreakpointName)

  let mediaQuery = exactBreakpoint

  // Bell, __/--\__
  if (minBreakpoint && maxBreakpoint && !except) {
    const { breakpoint } = mergeAreaRecords(
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

    mediaQuery = breakpoint
  }

  // Notch, --\__/--
  if (minBreakpoint && maxBreakpoint && except) {
    mediaQuery = [closeBreakpoint(minBreakpoint), openBreakpoint(maxBreakpoint)]
  }

  // High-pass, __/--
  if (minBreakpoint && !maxBreakpoint) {
    mediaQuery = openBreakpoint(minBreakpoint)
  }

  // Low-pass, --\__
  if (!minBreakpoint && maxBreakpoint) {
    mediaQuery = closeBreakpoint(maxBreakpoint)
  }

  const matches = useMediaQuery(mediaQuery)
  const ariaHidden = !matches ? { 'aria-hidden': 'true' } : {}

  return (
    <VisibleContainer {...boxProps} {...ariaHidden} matches={matches}>
      {children}
    </VisibleContainer>
  )
}

Visible.displayName = 'Visible'

export default Visible
