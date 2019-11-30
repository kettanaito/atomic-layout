import Layout from '../../../Layout'
import { BreakpointBehavior } from '../../../const/defaultOptions'
import propAliases from '../../../const/propAliases'
import parsePropName, {
  Props,
  ParsedBreakpoint,
} from '../../strings/parsePropName'
import isset from '../../functions/isset'
import createMediaQuery from '../createMediaQuery'

/**
 * Generateds a single CSS string for the set of props,
 * value, and its responsive information.
 */
const createStyleString = (
  cssProps: string[],
  propValue: any,
  parsedBreakpoint: ParsedBreakpoint,
  behavior: BreakpointBehavior,
) => {
  const styleString = cssProps
    .map((propName) => `${propName}:${String(propValue)};`)
    .join('')

  // Get a breakpoint dimensions based on the statically analyzed breakpoint.
  const breakpointOptions = Layout.breakpoints[parsedBreakpoint.name]

  // Wrap CSS rule in a media query only if its prop includes
  // a breakpoint and behavior different from the default ones.
  const shouldWrapInMediaQuery =
    breakpointOptions &&
    !(parsedBreakpoint.isDefault && behavior === Layout.defaultBehavior)

  return shouldWrapInMediaQuery
    ? `@media ${createMediaQuery(breakpointOptions, behavior)} {${styleString}}`
    : styleString
}

/**
 * Transforms known prop aliases to CSS rules for the given props.
 */
export default function applyStyles(pristineProps: Props): string {
  return (
    Object.keys(pristineProps)
      // Parse each prop to include "breakpoint" and "behavior"
      .map(parsePropName)
      // Filter out props that are not included in prop aliases
      .filter(({ purePropName }) => propAliases.hasOwnProperty(purePropName))
      // Filter out props with "undefined" or "null" as value
      .filter(({ originPropName }) => isset(pristineProps[originPropName]))
      // Map each prop to a CSS rule string
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
