// @flow
import type {
  Breakpoint,
  BreakpointBehavior,
} from '../../../const/defaultOptions'
import Layout from '../../../Layout'
import parsePropName from '../../strings/parsePropName'
import sanitizeTemplateString from '../../strings/sanitizeTemplateString'

export type Template = {
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
  areas: string[],
}

export type AreasList = {
  areas: string[],
  templates: Template[],
}

export type TemplateProps = {
  [propName: string]: string,
}

export default function generateAreasList(props: TemplateProps): AreasList {
  const areasList = Object.keys(props).reduce(
    (acc, propName) => {
      const { breakpointName, behavior } = parsePropName(propName)
      const templateAreas = sanitizeTemplateString(props[propName])

      /*
        TODO:
        maybe the next line is something to extract into the composition chain
        as well right after the filterTemplateProps function?

        we could lose the ternary if we do that

        + I think this function should assume that it gets perfectly valid input
        and leave the verification of that to someone else
      */
      const nextAreas = acc.areas.concat(templateAreas)
      const nextTemplates = acc.templates.concat({
        breakpoint: Layout.getBreakpoint(breakpointName),
        behavior,
        areas: templateAreas,
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

  return {
    areas: Array.from(new Set(areas)),
    templates,
  }
}
