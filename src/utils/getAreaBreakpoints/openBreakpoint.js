// @flow
import type { TAreaBreakpoint } from './getAreaBreakpoints'
import getPrefix from './getPrefix'

export default function openBreakpoint(
  breakpoint: TAreaBreakpoint,
): TAreaBreakpoint {
  console.log('open breakpoint:', breakpoint)

  return Object.keys(breakpoint).reduce((acc, key) => {
    console.log({ acc, key })
    return {
      ...acc,
      [key]: getPrefix(key) === 'max' ? undefined : breakpoint[key],
    }
  }, {})
}
