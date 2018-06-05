// @flow
import type { TBehavior, TBreakpoint } from '../const/breakpoints'
import type { TProps } from './getPropByName'
import propAliases from '../const/propAliases'
import breakpoints, {
  getBreakpointsNames,
  getBreakpoint,
} from '../const/breakpoints'

const breakpointsNames = getBreakpointsNames()
const allBehaviors: TBehavior[] = ['down', 'up', 'only']

export type TParsedResponsiveProp = {
  propName: string,
  breakpointName: ?string,
  behavior: TBehavior,
}

export const parseResponsivePropName = (
  propName: string,
): TParsedResponsiveProp => {
  const sanitizedPropName = propName.replace(/[A-Z]/g, (capitalLetter) => {
    return `-${capitalLetter}`.toLowerCase()
  })

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

const getMediaQueryString = (
  breakpointName: string,
  behavior: TBehavior,
): string => {
  const breakpoint: ?TBreakpoint = getBreakpoint(breakpointName)

  if (!breakpoint) {
    return ''
  }

  const { from, to } = breakpoint

  if (behavior === 'only' && from && to) {
    return `(min-width: ${from}px) and (max-width: ${to}px)`
  }

  if (behavior === 'down' && to) {
    return `(max-width: ${to}px)`
  }

  return from ? `(min-width: ${from}px)` : ''
}

const applyCssProps = (
  props: string[],
  propValue: mixed,
  breakpointName: ?string,
  behavior: TBehavior,
) => {
  const propLinesArr = props.map((propName) => {
    return `${propName}:${String(propValue)};`
  })

  let propsCss = propLinesArr.join('')

  if (breakpointName) {
    const query = getMediaQueryString(breakpointName, behavior)
    propsCss = `@media ${query} {${propsCss}}`
  }

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
