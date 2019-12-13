import * as React from 'react'
import styled from '@emotion/styled'
import {
  openBreakpoint,
  closeBreakpoint,
  mergeAreaRecords,
} from '@atomic-layout/core'
import Box from './Box'
import { useMediaQuery } from '../index'
import {
  OnlyProps,
  resolveBreakpoint,
} from '../../../atomic-layout/src/components/Only'

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

export default Visible
