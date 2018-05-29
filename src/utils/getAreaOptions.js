import { getBreakpointFor } from '../const/breakpoints'

export default function getAreaOptions(acc, template, isLast) {
  const { areas, mediaQuery: originalMediaQuery, behavior } = template
  const mediaQuery = originalMediaQuery || 'xs'
  const areaResolution = getBreakpointFor(mediaQuery)

  return areas.reduce((allAreasOptions, areaName) => {
    const prevAreaOptions = allAreasOptions[areaName] || []
    const lastAreaOptions = prevAreaOptions[prevAreaOptions.length - 1]

    const shouldUpdateLast =
      !!lastAreaOptions &&
      (lastAreaOptions.to + 1 === areaResolution.from ||
        (behavior === lastAreaOptions.behavior ||
          (lastAreaOptions.behavior === 'up' && behavior === 'down')))

    const nextTo = isLast && behavior === 'up' ? undefined : areaResolution.to

    if (shouldUpdateLast) {
      prevAreaOptions[prevAreaOptions.length - 1] = {
        from: lastAreaOptions.from,
        to: nextTo,
      }

      return Object.assign({}, allAreasOptions, {
        [areaName]: prevAreaOptions,
      })
    }

    const nextAreaOptions = prevAreaOptions.concat({
      behavior,
      from: areaResolution.from,
      to: nextTo,
    })

    return Object.assign({}, allAreasOptions, {
      [areaName]: nextAreaOptions,
    })
  }, acc)
}
