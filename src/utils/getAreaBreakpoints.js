// @flow
import type { TBreakpointBehavior } from '../const/defaultOptions'
import pop from './pop'

export type TAreaOptions = {
  behavior: TBreakpointBehavior,
  minWidth?: number,
  maxWidth?: number,
}

export default function getAreaOptions(
  areaName: string,
  templates,
): TAreaOptions {
  return templates.reduce((acc, template, index) => {
    // console.groupCollapsed(`getting area options for "${areaName}"`)
    // console.log('tempalte:', template)

    const isLast = index === templates.length - 1
    const precedingOptions = acc[acc.length - 1]

    // console.log('is last?', isLast)
    // console.log('preceding options', precedingOptions)

    const { areas, breakpoint, behavior } = template
    const includesArea = areas.includes(areaName)

    // console.warn('includes area?', includesArea)

    const hasSameBehavior =
      precedingOptions && precedingOptions.behavior === behavior
    const hasInclusiveBehavior =
      precedingOptions &&
      precedingOptions.behavior === 'up' &&
      behavior === 'down'

    const shouldUpdateLast =
      includesArea &&
      !!precedingOptions &&
      (hasSameBehavior || hasInclusiveBehavior)

    // console.log('has same behavior?', hasSameBehavior)
    // console.log('has inclusive behavior?', hasInclusiveBehavior)
    // console.log('should update last?', shouldUpdateLast)

    const nextMinWidth = shouldUpdateLast
      ? precedingOptions.minWidth
      : breakpoint.minWidth

    const nextMaxWidth =
      isLast && behavior === 'up' ? undefined : breakpoint.maxWidth

    // console.log('next min width:', nextMinWidth)
    // console.log('next max width:', nextMaxWidth)

    const options = includesArea
      ? {
          behavior,
          minWidth: nextMinWidth,
          maxWidth: nextMaxWidth,
        }
      : null

    const target = shouldUpdateLast ? pop(acc) : acc
    const nextAcc = target.concat(options)

    // console.warn('options:', options)
    // console.log('target:', target)
    // console.log('next acc:', nextAcc)
    // console.groupEnd()

    return nextAcc
  }, [])
}
