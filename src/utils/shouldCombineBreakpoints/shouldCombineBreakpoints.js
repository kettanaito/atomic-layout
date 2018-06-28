// @flow
import type { TAreaParams } from '../getAreaParams'

/**
 * Determines whether two given breakpoints can be combined.
 * Assures non-compatible breakpoints are not prompted to
 * be combined during the area params composition.
 */
export default function shouldCombineBreakpoints(
  breakpointA: TAreaParams,
  breakpointB: TAreaParams,
): boolean {
  /* First, shallow merge the breakpoints to reduce the amount of iterations */
  const mergedBreakpoint = {
    ...breakpointA,
    ...breakpointB,
  }

  /* Then reduce the properties of the merged breakpoint */
  const res = Object.keys(mergedBreakpoint).reduce(
    (acc, paramName) => {
      const { prevParam, shouldCombine } = acc

      if (!shouldCombine) {
        return acc
      }

      /**
       * Replaces "min/max" prefix with a single character
       * to allow strict comparison between params having
       * different prefixes.
       */
      const parsedParamName = paramName.replace(/^min|max/, '_')
      const nextShouldCombine = prevParam ? prevParam === parsedParamName : true

      return {
        prevParam: parsedParamName,
        shouldCombine: nextShouldCombine,
      }
    },
    {
      prevParam: null,
      shouldCombine: true,
    },
  )

  //
  const hasSameBehavior = breakpointA.behavior === breakpointB.behavior
  const hasInclusiveBehavior =
    breakpointA.behavior === 'up' && breakpointB.behavior === 'down'

  return res.shouldCombine
}
