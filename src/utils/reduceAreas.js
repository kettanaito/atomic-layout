// @flow
import type { TBreakpoint, TBreakpointBehavior } from '../const/defaultOptions'
import type { TGridTemplate } from './parseTemplates'
import Layout from '../Layout'
import pop from './pop'

export type TAreaBreakpoint = TBreakpoint & {
  behavior: TBreakpointBehavior,
}

export type TAreasCollection = {
  [AreaComponentName: string]: TAreaBreakpoint[],
}

export default function templateToAreas(
  templates: TGridTemplate[],
): ?TAreasCollection {
  const { length: templatesCount } = templates

  return templates.reduce(
    (areasCollection: TAreasCollection, template, index) => {
      const isLast = index === templatesCount - 1
      const {
        areas,
        breakpointName: originalBreakpointName,
        behavior,
      } = template
      const breakpointName = originalBreakpointName || 'xs'
      const areaBreakpoint = Layout.getBreakpoint(breakpointName)

      console.log(' ')

      if (!areaBreakpoint) {
        return areasCollection
      }

      return areas.reduce((allAreasOptions, areaName) => {
        const prevAreaOptions = allAreasOptions[areaName] || []
        const lastAreaOptions = prevAreaOptions[prevAreaOptions.length - 1]

        console.warn('reducing:', areaName)
        console.log('areaBreakpoint:', areaBreakpoint)
        console.log('allAreasOptions:', allAreasOptions)
        console.log('prevAreaOptions:', prevAreaOptions)
        console.log('lastAreaOptions:', lastAreaOptions)

        const hasPrecedingArea = !!lastAreaOptions
        const hasSiblingArea =
          hasPrecedingArea &&
          lastAreaOptions.maxWidth + 1 === areaBreakpoint.minWidth
        const hasSameBehavior =
          hasPrecedingArea && behavior === lastAreaOptions.behavior

        const hasInclusiveBehavior =
          hasPrecedingArea &&
          lastAreaOptions.behavior === 'up' &&
          behavior === 'down'

        const shouldUpdateLast =
          !!lastAreaOptions && (hasSameBehavior || hasInclusiveBehavior)

        const nextMinWidth = shouldUpdateLast
          ? lastAreaOptions.minWidth
          : areaBreakpoint.minWidth

        const nextMaxWidth =
          isLast && behavior === 'up' ? undefined : areaBreakpoint.maxWidth

        const optionsPool = shouldUpdateLast
          ? pop(prevAreaOptions)
          : prevAreaOptions

        const newAreaOption: TAreaBreakpoint = {
          behavior,
          minWidth: nextMinWidth,
          maxWidth: nextMaxWidth,
        }

        const nextAreaOptions = optionsPool.concat(newAreaOption)

        console.log('has sibling area?', hasSiblingArea)
        console.log('has preceding area?', hasPrecedingArea)
        console.log('has same behavior?', hasSameBehavior)
        console.log('has inclusive behavior?', hasInclusiveBehavior)
        console.log('should update last?', shouldUpdateLast)
        console.log('next maxWidth:', nextMaxWidth)
        console.log('next minWidth:', nextMinWidth)
        console.log('options pool:', optionsPool)
        console.log('new area option:', newAreaOption)

        return Object.assign({}, allAreasOptions, {
          [areaName]: nextAreaOptions,
        })
      }, areasCollection)
    },
    {},
  )
}
