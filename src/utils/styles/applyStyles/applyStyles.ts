import Layout from '@src/Layout'
import { BreakpointBehavior } from '@const/defaultOptions'
import propAliases from '@const/propAliases'
import parsePropName, { Props } from '@utils/strings/parsePropName'
import isset from '@utils/functions/isset'
import createMediaQuery from '../createMediaQuery'

const createStyleString = (
  propsList: string[],
  propValue: any,
  breakpoint: any /** @todo annotate this! */,
  behavior: BreakpointBehavior,
) => {
  const styleProps = propsList
    .map((propName) => `${propName}:${String(propValue)};`)
    .join('')

  const breakpointOptions = Layout.breakpoints[breakpoint.name]

  // Wrap CSS rule in a media query only if its prop includes
  // a breakpoint and behavior different than the default ones.
  const shouldWrapInMediaQuery =
    breakpointOptions &&
    !(breakpoint.isDefault && behavior === Layout.defaultBehavior)

  return shouldWrapInMediaQuery
    ? `@media ${createMediaQuery(breakpointOptions, behavior)} {${styleProps}}`
    : styleProps
}

/**
 * Produces a CSS string based on the given component props.
 * Takes only known prop aliases, ignores all the other props.
 */
export default function applyStyles(pristineProps: Props): string {
  return Object.entries(pristineProps)
    .reduce<string[]>((css, [pristinePropName, pristinePropValue]) => {
      const { purePropName, breakpoint, behavior } = parsePropName(
        pristinePropName,
      )
      const propAlias = propAliases[purePropName]

      // Filter out props with "undefined" or "null" as a value.
      // Filter out props that are not in the known prop aliases.
      if (!isset(pristineProps[pristinePropName]) || !propAlias) {
        return css
      }

      const { props, transformValue } = propAlias
      const propValue = transformValue
        ? transformValue(pristinePropValue)
        : pristinePropValue

      const styleString = createStyleString(
        props,
        propValue,
        breakpoint,
        behavior,
      )

      return css.concat(styleString)
    }, [])
    .join(' ')
}
