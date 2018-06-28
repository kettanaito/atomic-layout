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

  return res.shouldCombine
}
