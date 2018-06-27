// @flow
import type {
  TBreakpoint,
  TBreakpointBehavior,
} from '../../const/defaultOptions'
import type { TProps } from '../parsePropName'
import Layout from '../../Layout'
import parsePropName from '../parsePropName'
import sanitizeTemplateString from '../sanitizeTemplateString'

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
  const propKeys = Object.keys(props)

  /*
    if the propValue is not a string it is disqualified from being a template
    from the very get go, mini-optimization there + it removes the need to
    type-cast the value passed to sanitizeTemplateString since flow can now
    infer that the value can only be a string otherwise it would have been
    filtered out already
  */
  const templatePropKeys = propKeys.filter(
    (propKey) =>
      typeof props[propKey] === 'string' && /template/i.test(propKey),
  )

  const areasList = templatePropKeys.reduce(
    (res, propName) => {
      const { breakpointName, behavior } = parsePropName(propName)
      const propValue = sanitizeTemplateString(props[propName])
      const nextAreas = propValue ? res.areas.concat(propValue) : res.areas
      const nextTemplates = res.templates.concat({
        breakpoint: Layout.getBreakpoint(breakpointName),
        behavior,
        areas: propValue,
      })

      return {
        areas: nextAreas,
        templates: nextTemplates,
      }
    },
    {
      areas: [],
      templates: [],
    },
  )

  const { areas, templates } = areasList

  /*
    there were most likely duplicate areas so areas should be passed to a Set
    constructor before returning the areasList object

    Array.from() because otherwise the deepEqual test fails
    maybe this cast should be in the spec file instead of here?
  */
  return {
    areas: Array.from(new Set(areas)),
    templates,
  }
}
