import { useState } from 'react'
import { Breakpoint } from '@atomic-layout/core'
import useViewportChange from './useViewportChange'
import { query } from '../utils/query'

export type BreakpointRef = Breakpoint | string

export interface ResponsiveQueryParams {
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

/**
 * Returns a boolean indicating that the current viewport matches the given responsive query.
 * @example
 * const matches = useResponsiveQuery({ from: 'sm', to: 'lg' })
 * const matches = useResponsiveQuery({ except: true, from: 'md', to: 'lg' })
 */
export default function useResponsiveQuery(
  params: ResponsiveQueryParams,
  initialMatches: boolean = false,
): boolean {
  const [matches, setMatches] = useState(initialMatches)
  const mediaQuery = query(params)

  useViewportChange(() => {
    const { matches: hasMatchingQuery } = matchMedia(mediaQuery)
    setMatches(hasMatchingQuery)
  })

  return matches
}
