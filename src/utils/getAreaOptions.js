import { getBreakpointFor } from '../const/breakpoints'
import pop from './pop'

export default function getAreaOptions(acc, template, isLast) {
  const { areas, mediaQuery: originalMediaQuery, behavior } = template
  const mediaQuery = originalMediaQuery || 'xs'
  const areaResolution = getBreakpointFor(mediaQuery)

  return areas.reduce((allAreasOptions, areaName) => {
    const prevAreaOptions = allAreasOptions[areaName] || []
    const lastAreaOptions = prevAreaOptions[prevAreaOptions.length - 1]

    const hasPrecedingArea = !!lastAreaOptions
    const hasSiblingArea =
      hasPrecedingArea && lastAreaOptions.to + 1 === areaResolution.from
    const hasSameBehavior =
      hasSiblingArea && behavior === lastAreaOptions.behavior

    const hasInclusiveBehavior =
      hasSiblingArea && lastAreaOptions.behavior === 'up' && behavior === 'down'

    const shouldUpdateLast =
      !!lastAreaOptions && (hasSameBehavior || hasInclusiveBehavior)

    const nextTo = isLast && behavior === 'up' ? undefined : areaResolution.to

    const optionsPool = shouldUpdateLast
      ? pop(prevAreaOptions)
      : prevAreaOptions

    const nextAreaOptions = optionsPool.concat({
      behavior,
      from: shouldUpdateLast ? lastAreaOptions.from : areaResolution.from,
      to: nextTo,
    })

    return Object.assign({}, allAreasOptions, {
      [areaName]: nextAreaOptions,
    })
  }, acc)
}
