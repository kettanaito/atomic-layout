import React from 'react'
import styled, { css } from 'styled-components'
import Box from './Box'
import { OnlyProps, resolveBreakpoint } from './Only'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import mergeAreaRecords from '@src/utils/breakpoints/mergeAreaRecords'
import openBreakpoint from '@src/utils/breakpoints/openBreakpoint'
import closeBreakpoint from '@src/utils/breakpoints/closeBreakpoint'

const VisibleContainer = styled(Box)<{ matches: boolean }>`
  ${({ matches }) =>
    !matches &&
    css`
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

  console.log({ mediaQuery })

  const matches = useMediaQuery(mediaQuery)

  return (
    <VisibleContainer {...boxProps} matches={matches}>
      {children}
    </VisibleContainer>
  )
}

export default Visible
