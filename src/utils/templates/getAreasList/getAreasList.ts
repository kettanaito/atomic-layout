import { Breakpoint, BreakpointBehavior } from '@const/defaultOptions'
import Layout from '@src/Layout'
import parsePropName from '@utils/strings/parsePropName'

export interface Template {
  breakpoint: Breakpoint
  behavior: BreakpointBehavior
  areas: string[]
}

export interface AreasList {
  areas: string[]
  templates: Template[]
}

export interface TemplateProps {
  [propName: string]: string[]
}

export default function getAreasList(templateProps: TemplateProps): AreasList {
  const areasList = Object.entries(templateProps).reduce<AreasList>(
    (acc, [templateName, templateAreas]) => {
      const { breakpoint, behavior } = parsePropName(templateName)
      const nextAreas = acc.areas.concat(templateAreas)
      const nextTemplates = acc.templates.concat({
        breakpoint: Layout.getBreakpoint(breakpoint.name),
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
