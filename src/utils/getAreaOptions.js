// @flow
import type { TGridTemplate } from './parseTemplates'
import type { TAreaBreakpoint, TAreasCollection } from './reduceAreas'
import { getBreakpoint } from '../const/breakpoints'
import pop from './pop'

export default function getAreaOptions(
  acc: TAreasCollection,
  template: TGridTemplate,
  isLast: boolean,
): ?TAreasCollection {
  const { areas, breakpointName: originalBreakpointName, behavior } = template
  const breakpointName = originalBreakpointName || 'xs'
  const areaBreakpoint = getBreakpoint(breakpointName)

  if (!areaBreakpoint) {
    return
  }

  return areas.reduce((allAreasOptions, areaName) => {
    const prevAreaOptions = allAreasOptions[areaName] || []
    const lastAreaOptions = prevAreaOptions[prevAreaOptions.length - 1]

    const hasPrecedingArea = !!lastAreaOptions
    const hasSiblingArea =
      hasPrecedingArea && lastAreaOptions.to + 1 === areaBreakpoint.from
    const hasSameBehavior =
      hasSiblingArea && behavior === lastAreaOptions.behavior

    const hasInclusiveBehavior =
      hasSiblingArea && lastAreaOptions.behavior === 'up' && behavior === 'down'

    const shouldUpdateLast =
      !!lastAreaOptions && (hasSameBehavior || hasInclusiveBehavior)

    const nextTo = isLast && behavior === 'up' ? undefined : areaBreakpoint.to
    const nextFrom = shouldUpdateLast
      ? lastAreaOptions.from
      : areaBreakpoint.from

    const optionsPool = shouldUpdateLast
      ? pop(prevAreaOptions)
      : prevAreaOptions

    const newAreaOption: TAreaBreakpoint = {
      behavior,
      from: nextFrom,
      to: nextTo,
    }

    const nextAreaOptions = optionsPool.concat(newAreaOption)

    return Object.assign({}, allAreasOptions, {
      [areaName]: nextAreaOptions,
    })
  }, acc)
}
