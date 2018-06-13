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
    const { areas, breakpoint, behavior } = template
    let areaOptions = {
      behavior,
      minWidth: breakpoint.minWidth,
      maxWidth: breakpoint.maxWidth,
    }

    const isLast = index === templates.length - 1
    const prevAreaOptions = acc[acc.length - 1]
    const includesArea = areas.includes(areaName)

    /* Behaviors */
    const hasSameBehavior =
      prevAreaOptions && prevAreaOptions.behavior === areaOptions.behavior
    const hasInclusiveBehavior =
      prevAreaOptions &&
      prevAreaOptions.behavior === 'up' &&
      areaOptions.behavior === 'down'

    let shouldUpdatePrev =
      includesArea && (hasSameBehavior || hasInclusiveBehavior)
    const shouldStretch = prevAreaOptions && prevAreaOptions.behavior === 'up'

    if (includesArea) {
      if (hasSameBehavior || hasInclusiveBehavior) {
        areaOptions.minWidth = prevAreaOptions.minWidth
      }

      if (isLast && behavior === 'up') {
        areaOptions.maxWidth = undefined
      }
    } else {
      console.log('does not include area')
      if (shouldStretch) {
        console.log('should stretch prev!')
        shouldUpdatePrev = true
        areaOptions.behavior = 'down'
        areaOptions.minWidth = prevAreaOptions.minWidth
        areaOptions.maxWidth = breakpoint.minWidth - 1
      } else {
        areaOptions = null
      }
    }

    const target = shouldUpdatePrev ? pop(acc) : acc
    const nextAcc = target.concat(areaOptions)

    // console.groupCollapsed(`getting area options for "${areaName}"`)
    // console.log('tempalte:', template)
    // console.log('is last?', isLast)
    // console.log('prev breakpoint', prevAreaOptions)
    // console.warn('includes area?', includesArea)
    // console.log('should stretch?', shouldStretch)
    // console.log('has same behavior?', hasSameBehavior)
    // console.log('has inclusive behavior?', hasInclusiveBehavior)
    // console.log('should update prev?', shouldUpdatePrev)
    // console.warn('next area options:', areaOptions)
    // console.log('target:', target)
    // console.log('next acc:', nextAcc)
    // console.groupEnd()

    return nextAcc
  }, [])
}
