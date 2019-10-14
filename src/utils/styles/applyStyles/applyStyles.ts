import Layout from '@src/Layout'
import { BreakpointBehavior, Breakpoint } from '@const/defaultOptions'
import propAliases, { PropAliasDeclaration } from '@const/propAliases'
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

interface PropAliasGroup {
  propAlias: PropAliasDeclaration
  records: Array<{
    propValue: any
    breakpoint: Breakpoint
    behavior: BreakpointBehavior
  }>
}

/**
 * Produces a CSS string based on the given component props.
 * Takes only known prop aliases, ignores all the other props.
 */
export default function applyStyles(pristineProps: Props): string {
  // First, split pritstine component's props into prop alias groups.
  // This allows to operate with each prop alias with all its records at once.
  const propAliasGroups = Object.entries(pristineProps)
    // Filter out props with "undefined" or "null" as a value.
    .filter(([_, propValue]) => isset(propValue))
    .reduce<Record<string, PropAliasGroup>>(
      (groups, [pristinePropName, pristinePropValue]) => {
        const { purePropName, breakpoint, behavior } = parsePropName(
          pristinePropName,
        )
        const propAlias = propAliases[purePropName]

        // Filter out props that are not in the known prop aliases.
        if (!propAlias) {
          return groups
        }

        const prevRecords = groups[purePropName]
          ? groups[purePropName].records
          : []
        const nextRecords = prevRecords.concat({
          breakpoint,
          behavior,
          propValue: pristinePropValue,
        })
        const groupItem: PropAliasGroup = {
          propAlias,
          records: nextRecords,
        }

        return {
          ...groups,
          [purePropName]: groupItem,
        }
      },
      {},
    )

  return Object.entries(propAliasGroups)
    .reduce<string[]>((css, [_, propAliasGroup]) => {
      const { propAlias, records } = propAliasGroup
      const { props, transformValue } = propAlias

      const styles = records.map(({ breakpoint, behavior, propValue }) => {
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

      return css.concat(styles)
    }, [])
    .join(' ')
}
