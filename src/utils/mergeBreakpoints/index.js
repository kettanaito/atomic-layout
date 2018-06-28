// @flow
import type { TAreaParams } from '../getAreaParams'
import pop from '../pop'
import shouldCombineBreakpoints from '../shouldCombineBreakpoints'

export default function mergeBreakpoints(
  areaParamsList: TAreaParams[],
  nextAreaParams: TAreaParams,
  includesArea: boolean,
  isLast: boolean,
): TAreaParams[] {
  const lastAreaParams = areaParamsList[areaParamsList.length - 1]

  // if (!lastAreaParams) {
  //   return areaParamsList.concat(nextAreaParams)
  // }

  // const { behavior: lastBehavior, ...lastAreaBreakpoint } = lastAreaParams
  // const { behavior: nextBehavior, ...nextAreaBreakpoint } = nextAreaParams

  /* First, check if two breakpoints even can be combined */
  // const shouldCombine = shouldCombineBreakpoints(
  //   lastAreaBreakpoint,
  //   nextAreaBreakpoint,
  // )

  // console.log(' ')
  // console.log('mergeBreakpoints')
  // console.log({ areaParamsList })
  // console.log({ lastAreaParams })
  // console.log({ nextAreaParams })
  // console.log({ includesArea })
  // console.log({ isLast })
  // console.log({ shouldCombine })

  /* Append non-compatible breakpoint to the end of the list */
  // if (!shouldCombine) {
  //   return areaParamsList.concat(nextAreaParams)
  // }

  /* Determine breakpoint behaviors */
  const hasSameBehavior =
    lastAreaParams && lastAreaParams.behavior === nextAreaParams.behavior
  const hasInclusiveBehavior =
    lastAreaParams &&
    lastAreaParams.behavior === 'up' &&
    nextAreaParams.behavior === 'down'

  /* Determine areas relation */
  let shouldUpdatePrevious =
    includesArea && (hasSameBehavior || hasInclusiveBehavior)
  const shouldStretch = lastAreaParams && lastAreaParams.behavior === 'up'

  // const foo = {
  //   behavior: !includesArea && shouldStretch ? 'down' : nextAreaParams.behavior,
  //   minWidth:
  //     shouldUpdatePrevious || shouldStretch
  //       ? lastAreaParams.minWidth
  //       : nextAreaParams.minWidth,
  //   maxWidth:
  //     includesArea && isLast && nextAreaParams.behavior === 'up'
  //       ? undefined
  //       : shouldStretch
  //         ? nextAreaParams.minWidth - 1
  //         : nextAreaParams.maxWidth,
  // }

  //

  if (includesArea) {
    if (hasSameBehavior || hasInclusiveBehavior) {
      nextAreaParams.minWidth = lastAreaParams.minWidth
    }

    if (isLast && nextAreaParams.behavior === 'up') {
      nextAreaParams.maxWidth = undefined
    }
  } else {
    if (shouldStretch) {
      shouldUpdatePrevious = true
      nextAreaParams.behavior = 'down'
      nextAreaParams.maxWidth = nextAreaParams.minWidth - 1
      nextAreaParams.minWidth = lastAreaParams.minWidth
    } else {
      nextAreaParams = null
    }
  }

  // console.log({ shouldUpdatePrevious })
  // console.log({ shouldStretch })
  // console.log({ nextAreaParams })

  // Update
  const target = shouldUpdatePrevious ? pop(areaParamsList) : areaParamsList
  return target.concat(nextAreaParams)

  // return target.concat(!includesArea && !shouldStretch ? null : foo)
}
