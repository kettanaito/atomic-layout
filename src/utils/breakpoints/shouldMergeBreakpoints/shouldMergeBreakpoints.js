// @flow
import type { AreaParams } from '../getAreaBreakpoints'

/**
 * Replaces the prefixes in a parameter name.
 * Allows strict comparison of same parameters with different prefixes.
 * Does not test for inclusion/notch.
 *
 * @example
 * neutralizeParamName('maxWidth') // "_width"
 * neutralizeParamName('minWidth') // "_width"
 */
const neutralizeParamName = (paramName: string): string => {
  return paramName.replace(/^min|max/, '_')
}

/**
 * Determines whether two given breakpoints can be merged.
 * Assures non-compatible breakpoints are not prompted to
 * be merged during the area params composition.
 */
export default function shouldCombineBreakpoints(
  breakpointA: AreaParams,
  breakpointB: AreaParams,
): boolean {
  const allParams = Object.keys(breakpointA).concat(Object.keys(breakpointB))

  return allParams.every((pristineParamName, index) => {
    const paramName = neutralizeParamName(pristineParamName)
    const prevParamName = neutralizeParamName(allParams[index - 1] || paramName)

    return paramName === prevParamName
  })
}
