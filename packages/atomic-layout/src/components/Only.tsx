import * as React from 'react'
import { BoxProps } from '@atomic-layout/core'
import Box from './Box'
import useResponsiveQuery, {
  ResponsiveQueryParams,
} from '../hooks/useResponsiveQuery'
import { forwardRef } from '../utils/forwardRef'

export type OnlyProps = BoxProps & ResponsiveQueryParams

const Only = forwardRef<unknown, OnlyProps>(
  ({ children, except, for: exactBreakpoint, from, to, ...restProps }, ref) => {
    const matches = useResponsiveQuery({
      for: exactBreakpoint,
      from,
      to,
      except,
    })

    return (
      matches && (
        <Box ref={ref} {...restProps}>
          {children}
        </Box>
      )
    )
  },
)

Only.displayName = 'Only'

export default Only
