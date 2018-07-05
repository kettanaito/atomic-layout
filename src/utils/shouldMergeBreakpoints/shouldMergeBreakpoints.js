// @flow
import type { TAreaParams } from '../getAreaBreakpoints'

/**
 * Determines whether two given breakpoints can be merged.
 * Assures non-compatible breakpoints are not prompted to
 * be merged during the area params composition.
 */
export default function shouldCombineBreakpoints(
  breakpointA: TAreaParams,
  breakpointB: TAreaParams,
): boolean {
  console.log('shouldCombineBreakpoints')
  console.log({ breakpointA })
  console.log({ breakpointB })

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
