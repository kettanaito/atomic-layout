import {
  mergeAreaRecords,
  Breakpoint,
  Layout,
  openBreakpoint,
  closeBreakpoint,
} from '@atomic-layout/core'
import {
  ResponsiveQueryParams,
  BreakpointRef,
} from '../hooks/useResponsiveQuery'

export const resolveBreakpoint = (breakpointRef: BreakpointRef): Breakpoint => {
  return typeof breakpointRef === 'string'
    ? Layout.breakpoints[breakpointRef]
    : breakpointRef
}

/**
 * Returns a list of breakpoints based on a responsive query.
 * @example
 * getBreakpointsByQuery({ from: 'md' })
 * // [{ minWidth: 768 }]
 * getBreakpointsByQuery({ from: 'sm', to: 'lg' })
 * // [{ minWidth: 576 }, { maxWidth: 1199 }]
 */
export const getBreakpointsByQuery = (
  params: ResponsiveQueryParams,
): Breakpoint[] => {
  const { for: exactBreakpoint, from, to, except } = params

  // Explicit breakpoint
  if (exactBreakpoint) {
    return [resolveBreakpoint(exactBreakpoint)]
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

    return [mergedAreaRecord.breakpoint]
  }

  // Notch, --\__/--
  if (minBreakpoint && maxBreakpoint && except) {
    return [closeBreakpoint(minBreakpoint), openBreakpoint(maxBreakpoint)]
  }

  // High-pass, __/--
  if (minBreakpoint && !maxBreakpoint) {
    return [openBreakpoint(minBreakpoint)]
  }

  // Low-pass, --\__
  if (!minBreakpoint && maxBreakpoint) {
    return [closeBreakpoint(maxBreakpoint)]
  }

  return []
}
