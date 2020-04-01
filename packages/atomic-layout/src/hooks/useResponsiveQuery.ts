import { useState, useMemo } from 'react'
import {
  Breakpoint,
  Layout,
  openBreakpoint,
  closeBreakpoint,
  mergeAreaRecords,
} from '@atomic-layout/core'
import { createMediaQuery } from './useMediaQuery'
import useViewportChange from './useViewportChange'

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

export const resolveBreakpoint = (breakpointRef: BreakpointRef): Breakpoint => {
  return typeof breakpointRef === 'string'
    ? Layout.breakpoints[breakpointRef]
    : breakpointRef
}

const getBreakpoints = (
  exactBreakpoint: BreakpointRef,
  from: BreakpointRef,
  to: BreakpointRef,
  except: boolean,
) => {
  // Explicit breakpoint
  if (exactBreakpoint) {
    return resolveBreakpoint(exactBreakpoint)
  }

  const minBreakpoint = resolveBreakpoint(from)
  const maxBreakpoint = resolveBreakpoint(to)

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

    return mergedAreaRecord.breakpoint
  }

  // Notch, --\__/--
  if (minBreakpoint && maxBreakpoint && except) {
    return [closeBreakpoint(minBreakpoint), openBreakpoint(maxBreakpoint)]
  }

  // High-pass, __/--
  if (minBreakpoint && !maxBreakpoint) {
    return openBreakpoint(minBreakpoint)
  }

  // Low-pass, --\__
  if (!minBreakpoint && maxBreakpoint) {
    return closeBreakpoint(maxBreakpoint)
  }
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

  const { for: exactBreakpoint, from, to, except } = params
  const breakpointsList = useMemo(() => {
    const breakpoints = getBreakpoints(exactBreakpoint, from, to, except)

    if (!breakpoints) {
      return []
    }

    return [].concat(breakpoints).map(createMediaQuery)
  }, [exactBreakpoint, from, to, except])

  useViewportChange(() => {
    const hasMatchingQuery = breakpointsList.some((mediaQuery) => {
      return matchMedia(mediaQuery).matches
    })

    setMatches(hasMatchingQuery)
  })

  return matches
}
