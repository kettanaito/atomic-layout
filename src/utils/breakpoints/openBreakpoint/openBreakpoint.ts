import { Breakpoint } from '@const/defaultOptions'
import getPrefix from '@utils/strings/getPrefix'

/**
 * Opens the given breakpoint.
 * A breakpoint is considered open when it has no upper boundary. For example,
 * a breakpoint that has "maxWidth: undefined" is the open breakpoint.
 */
export default function openBreakpoint(breakpoint: Breakpoint): Breakpoint {
  return Object.keys(breakpoint).reduce<Breakpoint>(
    (acc, key) => ({
      ...acc,
      [key]: getPrefix(key) === 'max' ? undefined : breakpoint[key],
    }),
    {},
  )
}
