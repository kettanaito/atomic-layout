// @flow
import type {
  TBreakpoint,
  TBreakpointBehavior,
} from '../../const/defaultOptions'
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

export type TTemplateProps = {
  [propName: string]: string,
}

/*
  TODO: rename to genAreasList() ? (for generate)
  'get' implies they already exist somewhere and we're just accessing and
  returning them, but that's not the case -> same with getAreaParams
*/
export default function getAreasList(props: TTemplateProps): TAreasList {
  const areasList = Object.keys(props).reduce(
    (res, propName) => {
      const { breakpointName, behavior } = parsePropName(propName)

      /*
        TODO:
        maybe the next line is something to extract into the composition chain
        as well right after the filterTemplateProps function?

        we could lose the ternary if we do that

        + I think this function should assume that it gets perfectly valid input
        and leave the verification of that to someone else
      */
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
