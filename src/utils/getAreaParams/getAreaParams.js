// @flow
import type {
  TBreakpoint,
  TBreakpointBehavior,
} from '../../const/defaultOptions'
import pop from '../pop'
import type { TTemplate } from '../getAreasList'

export type TAreaParams = TBreakpoint & {
  behavior: TBreakpointBehavior,
}

export default function getAreaParams(
  areaName: string,
  templates: TTemplate[],
): TAreaParams[] {
  return templates.reduce((acc, template, index) => {
    const { areas, breakpoint, behavior } = template
    let areaOptions: TAreaParams = {
      behavior,
      minWidth: breakpoint.minWidth,
      maxWidth: breakpoint.maxWidth,
    }

    const isLast = index === templates.length - 1
    const prevAreaOptions = acc[acc.length - 1]
    const includesArea = areas.includes(areaName)

    const prevBehavior = prevAreaOptions && prevAreaOptions.behavior
    const wentUp = prevBehavior === 'up'
    const { behavior: nextBehavior } = areaOptions
    const goesDown = nextBehavior === 'down'

    /* Behaviors */
    const hasSameBehavior = prevBehavior === nextBehavior
    const hasInclusiveBehavior = wentUp && goesDown

    let shouldUpdatePrevious =
      includesArea && (hasSameBehavior || hasInclusiveBehavior)
    const shouldStretch = prevAreaOptions && wentUp

    if (includesArea) {
      if (hasSameBehavior || hasInclusiveBehavior) {
        areaOptions.minWidth = prevAreaOptions.minWidth
      }

      if (isLast && behavior === 'up') {
        areaOptions.maxWidth = undefined
      }
    } else {
      if (shouldStretch) {
        shouldUpdatePrevious = true
        areaOptions.behavior = 'down'
        areaOptions.minWidth = prevAreaOptions.minWidth
        areaOptions.maxWidth = breakpoint.minWidth - 1

        // TODO
        // Assigning object to array is sure thing hacky,
        // but result-wise, this is how it should behave.
        areaOptions = [areaOptions, null]
      } else {
        areaOptions = null
      }
    }

    const target = shouldUpdatePrevious ? pop(acc) : acc
    return target.concat(areaOptions)
  }, [])
}
