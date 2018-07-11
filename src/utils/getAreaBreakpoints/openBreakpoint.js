// @flow
import type { TAreaBreakpoint } from './getAreaBreakpoints'
import getPrefix from './getPrefix'

/**
 * Opens the given breakpoint.
 * A breakpoint is considered open when it has no upper boundary. For example,
 * a breakpoint that has "maxWidth: undefined" is the open breakpoint.
 */
export default function openBreakpoint(
  breakpoint: TAreaBreakpoint,
): TAreaBreakpoint {
  return Object.keys(breakpoint).reduce((acc, key) => {
    return {
      ...acc,
      [key]: getPrefix(key) === 'max' ? undefined : breakpoint[key],
    }
  }, {})
}
