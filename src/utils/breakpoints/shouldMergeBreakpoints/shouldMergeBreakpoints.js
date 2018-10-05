// @flow
import type { AreaParams } from '../getAreaBreakpoints'

/**
 * Determines whether two given breakpoints can be merged.
 * Assures non-compatible breakpoints are not prompted to
 * be merged during the area params composition.
 */
export default function shouldCombineBreakpoints(
  breakpointA: AreaParams,
  breakpointB: AreaParams,
): boolean {
  const allParams = [...Object.keys(breakpointA), ...Object.keys(breakpointB)]

  return allParams.every((paramName, index) => {
    const transformedParamName = paramName.replace(/^min|max/, '_')
    const prevParamName = allParams[index - 1]
    const compareTo = prevParamName
      ? prevParamName.replace(/^min|max/, '_')
      : transformedParamName

    return transformedParamName === compareTo
  })
}
