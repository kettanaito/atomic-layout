import React from 'react'
import styled from 'styled-components'
import Box from './Box'
import { OnlyProps } from './Only'
import useResponsiveQuery from '../hooks/useResponsiveQuery'
import { forwardRef } from '../utils/forwardRef'

const VisibleContainer = styled(Box)<{ matches: boolean }>`
  ${({ matches }) =>
    !matches &&
    `
      visibility: hidden;
    `}
`

const Visible = forwardRef<unknown, OnlyProps>(
  (
    { children, except, for: exactBreakpointName, from, to, ...boxProps },
    ref,
  ) => {
    const matches = useResponsiveQuery({
      except,
      for: exactBreakpointName,
      from,
      to,
    })
    const ariaAttributes = !matches ? { 'aria-hidden': 'true' } : {}

    return (
      <VisibleContainer
        ref={ref}
        {...boxProps}
        {...ariaAttributes}
        matches={matches}
      >
        {children}
      </VisibleContainer>
    )
  },
)

Visible.displayName = 'Visible'

export default Visible
