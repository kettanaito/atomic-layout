// @flow
import type { TBreakpointBehavior } from '../../../const/defaultOptions'
import type { TProps } from '../../strings/parsePropName'
import propAliases from '../../../const/propAliases'
import Layout from '../../../Layout'
import parsePropName from '../../strings/parsePropName'
import createMediaQuery from '../createMediaQuery'

const applyCssProps = (
  props: string[],
  propValue: mixed,
  breakpointName: ?string,
  isDefaultBreakpoint: boolean,
  behavior: TBreakpointBehavior,
) => {
  const propLinesArr = props.map((propName) => {
    return `${propName}:${String(propValue)};`
  })

  let propsCss = propLinesArr.join('')
  const breakpoint = Layout.getBreakpoint(breakpointName)

  /**
   * Wrap CSS rule in media query only if its prop
   * includes a breakpoint and behavior different than
   * the default ones.
   */
  if (
    breakpoint &&
    !(isDefaultBreakpoint && behavior === Layout.defaultBehavior)
  ) {
    const queryString = createMediaQuery(breakpoint, behavior)
    propsCss = `@media ${queryString} {${propsCss}}`
  }

  return propsCss
}

export default function applyStyles(pristineProps: TProps): string {
  const stylesArr = Object.keys(pristineProps).reduce(
    (allStyles, originalPropName) => {
      const {
        purePropName,
        breakpointName,
        isDefaultBreakpoint,
        behavior,
      } = parsePropName(originalPropName)

      const aliasOptions = propAliases[purePropName]
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
        isDefaultBreakpoint,
        behavior,
      )

      return allStyles.concat(css)
    },
    [],
  )

  return stylesArr.join(' ')
}
