// @flow
import type { TBreakpoint, TBreakpointBehavior } from '../const/defaultOptions'
import type { TProps } from './getPropByName'
import propAliases from '../const/propAliases'
import Layout from '../Layout'
import toDashedString from './toDashedString'
import createMediaQuery from './createMediaQuery'

const breakpointsNames = Layout.getBreakpointsNames()
const allBehaviors: TBreakpointBehavior[] = ['down', 'up', 'only']

export type TParsedResponsiveProp = {
  propName: string,
  breakpointName: ?string,
  behavior: TBreakpointBehavior,
}

export const parseResponsivePropName = (
  propName: string,
): TParsedResponsiveProp => {
  const sanitizedPropName = toDashedString(propName)
  const splitPropName = sanitizedPropName.split('-')

  const res = splitPropName.reduce(
    (acc, part, index) => {
      if (breakpointsNames.includes(part)) {
        return Object.assign({}, acc, { breakpointName: part })
      }

      if (allBehaviors.includes(part)) {
        return Object.assign({}, acc, { behavior: part })
      }

      const propNamePart =
        index > 0
          ? part.slice(0, 1).toUpperCase() + part.slice(1, part.length)
          : part
      const nextPropName = `${acc.propName}${propNamePart}`

      return Object.assign({}, acc, { propName: nextPropName })
    },
    {
      propName: '',
      breakpointName: null,
      behavior: 'up',
    },
  )

  return res
}

const applyCssProps = (
  props: string[],
  propValue: mixed,
  breakpointName: ?string,
  behavior: TBreakpointBehavior,
) => {
  const propLinesArr = props.map((propName) => {
    return `${propName}:${String(propValue)};`
  })

  let propsCss = propLinesArr.join('')
  const breakpoint = Layout.getBreakpoint(breakpointName)

  if (breakpoint) {
    const queryString = createMediaQuery(breakpoint, behavior)
    propsCss = `@media ${queryString} {${propsCss}}`
  }

  console.log(propsCss)

  return propsCss
}

export default function applyStyles(pristineProps: TProps): string {
  const stylesArr = Object.keys(pristineProps).reduce(
    (allStyles, originalPropName) => {
      const { propName, breakpointName, behavior } = parseResponsivePropName(
        originalPropName,
      )

      const aliasOptions = propAliases[propName]
      if (!aliasOptions) {
        return allStyles
      }

      const { props, transformValue } = aliasOptions
      const propValue = pristineProps[originalPropName]
      const transformedPropValue = transformValue
        ? transformValue(propValue)
        : propValue

      const css = applyCssProps(
        props,
        transformedPropValue,
        breakpointName,
        behavior,
      )

      return allStyles.concat(css)
    },
    [],
  )

  return stylesArr.join(' ')
}
