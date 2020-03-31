import * as React from 'react'
import { BoxProps } from '@atomic-layout/core'
import Box from './Box'
import useResponsiveQuery, {
  ResponsiveQueryParams,
} from '../hooks/useResponsiveQuery'

export type OnlyProps = BoxProps & ResponsiveQueryParams

const Only: React.FC<OnlyProps> = ({
  children,
  except,
  for: exactBreakpoint,
  from,
  to,
  ...restProps
}) => {
  const matches = useResponsiveQuery({ for: exactBreakpoint, from, to, except })
  return matches && <Box {...restProps}>{children}</Box>
}

Only.displayName = 'Only'

export default Only
