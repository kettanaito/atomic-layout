// @flow
import type { AreaBreakpoint } from '../getAreaBreakpoints'
import getPrefix from '../../strings/getPrefix'

/**
 * Opens the given breakpoint.
 * A breakpoint is considered open when it has no upper boundary. For example,
 * a breakpoint that has "maxWidth: undefined" is the open breakpoint.
 */
export default function openBreakpoint(
  breakpoint: AreaBreakpoint,
): AreaBreakpoint {
  return Object.keys(breakpoint).reduce((acc, key) => {
    return {
      ...acc,
      [key]: getPrefix(key) === 'max' ? undefined : breakpoint[key],
    }
  }, {})
}
