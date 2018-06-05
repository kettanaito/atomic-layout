// @flow
import type { TBreakpoint, TBreakpointBehavior } from '../const/defaultOptions'
import type { TGridTemplate } from './parseTemplates'
import Layout from '../Layout'
import pop from './pop'

export type TAreaBreakpoint = {
  behavior: TBreakpointBehavior,
  from: ?number,
  to: ?number,
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

      if (!areaBreakpoint) {
        return areasCollection
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
          hasSiblingArea &&
          lastAreaOptions.behavior === 'up' &&
          behavior === 'down'

        const shouldUpdateLast =
          !!lastAreaOptions && (hasSameBehavior || hasInclusiveBehavior)

        const nextTo =
          isLast && behavior === 'up' ? undefined : areaBreakpoint.to
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
      }, areasCollection)
    },
    {},
  )
}
