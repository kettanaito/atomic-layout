import { Breakpoint } from '../../../const/defaultOptions'
import getPrefix from '../../strings/getPrefix'

/**
 * Opens the given breakpoint.
 * A breakpoint is considered open when it has no upper boundary. For example,
 * a breakpoint that has "maxWidth: undefined" is the open breakpoint.
 */
export default function openBreakpoint<T = Breakpoint>(
  breakpoint: Breakpoint,
): T {
  return Object.keys(breakpoint).reduce<T>(
    (acc, key) => ({
      ...acc,
      [key]: getPrefix(key) === 'max' ? undefined : breakpoint[key],
    }),
    {} as T,
  )
}
