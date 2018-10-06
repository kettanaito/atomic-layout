// @flow
import type { BreakpointBehavior } from '../../../const/defaultOptions'
import type { Props } from '../../strings/parsePropName'
import propAliases from '../../../const/propAliases'
import Layout from '../../../Layout'
import parsePropName from '../../strings/parsePropName'
import createMediaQuery from '../createMediaQuery'

const createStyleString = (
  propsList: string[],
  propValue: mixed,
  breakpoint: any,
  behavior: BreakpointBehavior,
) => {
  let styleProps = propsList
    .map((propName) => `${propName}:${String(propValue)};`)
    .join('')

  const breakpointOptions = Layout.getBreakpoint(breakpoint.name)

  /**
   * Wrap CSS rule in a media query only if its prop includes
   * a breakpoint and behavior different than the default ones.
   */
  const shouldWrapInMediaQuery =
    breakpointOptions &&
    !(breakpoint.isDefault && behavior === Layout.defaultBehavior)

  return shouldWrapInMediaQuery
    ? `@media ${createMediaQuery(breakpointOptions, behavior)} {${styleProps}}`
    : styleProps
}

export default function applyStyles(pristineProps: Props): string {
  return Object.keys(pristineProps)
    .map(parsePropName)
    .filter(({ purePropName }) => propAliases.hasOwnProperty(purePropName))
    .map(({ purePropName, originPropName, breakpoint, behavior }) => {
      const { props, transformValue } = propAliases[purePropName]
      const propValue = pristineProps[originPropName]
      const transformedPropValue = transformValue
        ? transformValue(propValue)
        : propValue

      return createStyleString(
        props,
        transformedPropValue,
        breakpoint,
        behavior,
      )
    })
    .join(' ')
}
