// @flow
import type { TAreaBreakpoint } from './getAreaBreakpoints'
import getPrefix from './getPrefix'

export default function closeBreakpoint(
  breakpoint: TAreaBreakpoint,
): TAreaBreakpoint {
  return Object.keys(breakpoint).reduce((acc, keyName) => {
    return {
      ...acc,
      [keyName]: getPrefix(keyName) === 'max' ? undefined : breakpoint[keyName],
    }
  }, {})
}
