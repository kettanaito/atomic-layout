// @flow
import type { TBreakpoint } from '../../const/defaultOptions'

/**
 * Determines whether two given breakpoints can be combined.
 * Assures non-compatible breakpoints are not prompted to
 * be combined during the area params composition.
 */
export default function shouldCombineBreakpoints(
  breakpointA: TBreakpoint,
  breakpointB: TBreakpoint,
): boolean {
  /* First, shallow merge the breakpoints to reduce the amount of iterations */
  const mergedBreakpoint = {
    ...breakpointA,
    ...breakpointB,
  }

  /* Then reduce the properties of the merged breakpoint */
  return Object.keys(mergedBreakpoint).reduce((canCombine, propName) => {
    // should analyze keys in the object, and return false
    // as soon as found not compatible keys.
    return canCombine
  }, false)
}
