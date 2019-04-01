import Layout from '@src/Layout'
import { BreakpointBehavior } from '@const/defaultOptions'
import propAliases from '@const/propAliases'
import parsePropName, { Props } from '@utils/strings/parsePropName'
import isset from '@utils/functions/isset'
import createMediaQuery from '../createMediaQuery'

const createStyleString = (
  propsList: string[],
  propValue: any,
  breakpoint: any,
  behavior: BreakpointBehavior,
) => {
  const styleProps = propsList
    .map((propName) => `${propName}:${String(propValue)};`)
    .join('')

  const breakpointOptions = Layout.getBreakpoint(breakpoint.name)

  /**
   * Wrap CSS rule in a media query only if its prop includes
   * a breakpoint and behavior different than the default ones.
   */
  const shouldWrapInMediaQuery =
    breakpointOptions &&
    !(breakpoint.isDefault && behavior === Layout.options.defaultBehavior)

  return shouldWrapInMediaQuery
    ? `@media ${createMediaQuery(breakpointOptions, behavior)} {${styleProps}}`
    : styleProps
}

export default function applyStyles(pristineProps: Props): string {
  return (
    Object.keys(pristineProps)
      /* Parse each prop to include "breakpoint" and "behavior" */
      .map(parsePropName)
      /* Filter out props that are not included in prop aliases */
      .filter(({ purePropName }) => propAliases.hasOwnProperty(purePropName))
      /* Filter out props with "undefined" or "null" as value */
      .filter(({ originPropName }) => isset(pristineProps[originPropName]))
      /* Map each prop to a CSS string */
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
  )
}
