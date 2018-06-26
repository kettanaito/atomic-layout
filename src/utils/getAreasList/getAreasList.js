// @flow
import type { TBreakpoint, TBreakpointBehavior } from '../../const/defaultOptions'
import type { TProps }                           from '../parsePropName'
import Layout                                    from '../../Layout'
import toNumber                                  from '../math/toNumber'
import parsePropName                             from '../parsePropName'
import sanitizeTemplateString                    from '../sanitizeTemplateString'

export type TTemplate = {
  breakpoint: TBreakpoint,
  behavior: TBreakpointBehavior,
  areas: string[],
}

export type TAreasList = {
  areas: string[],
  templates: TTemplate[],
}

export default function getAreasList(props: TProps): TAreasList {
  const areas = Object.keys(props).reduce(
    (res, propName) => {
      const { purePropName, breakpointName, behavior } = parsePropName(propName)
      const isTemplateProp = purePropName === 'template'
      const propValue =
        isTemplateProp &&
        sanitizeTemplateString(((props[propName]: any): string))

      const nextAreas =
        isTemplateProp && propValue ? res.areas.concat(propValue) : res.areas
      const nextTemplates = isTemplateProp
        ? res.templates.concat({
            breakpoint: Layout.getBreakpoint(breakpointName),
            behavior,
            areas: propValue,
          })
        : res.templates

      return {
        areas: Array.from(new Set(nextAreas)),
        templates: nextTemplates,
      }
    },
    {
      areas: [],
      templates: [],
    },
  )

  return areas
}
