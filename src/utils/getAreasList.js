// @flow
import Layout from '../Layout'
import toNumber from './toNumber'
import parsePropName from './parsePropName'
import sanitizeTemplateString from './sanitizeTemplateString'

export default function getAreasList(props): string[] {
  const areas = Object.keys(props).reduce(
    (res, propName) => {
      const { purePropName, breakpointName, behavior } = parsePropName(propName)
      const isTemplateProp = purePropName === 'template'
      const propValue =
        isTemplateProp && sanitizeTemplateString(props[propName])

      const nextAreas = isTemplateProp ? res.areas.concat(propValue) : res.areas
      const breakpoint = Layout.getBreakpoint(breakpointName)

      const nextTemplates = isTemplateProp
        ? res.templates.concat({
            breakpoint: breakpoint && {
              minWidth: toNumber(breakpoint.minWidth),
              maxWidth: toNumber(breakpoint.maxWidth),
            },
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
