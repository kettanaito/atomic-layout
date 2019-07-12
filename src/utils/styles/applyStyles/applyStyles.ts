import Layout from '@src/Layout'
import { BreakpointBehavior } from '@const/defaultOptions'
import propAliases from '@const/propAliases'
import parsePropName, { Props } from '@utils/strings/parsePropName'
import isset from '@utils/functions/isset'
import mergeBreakpoints from '@utils/breakpoints/mergeBreakpoints'
import createMediaQuery from '../createMediaQuery'
import { AreaBreakpoint } from '@src/utils/breakpoints/getAreaBreakpoints'

const createStyleString = (
  propsList: string[],
  propValue: any,
  areaBreakpoint: {
    isDefault: boolean
    values: AreaBreakpoint
  },
  // breakpoint: any,
  // behavior: BreakpointBehavior,
) => {
  const { isDefault, values } = areaBreakpoint
  const { behavior, ...breakpoint } = values
  const styleProps = propsList
    .map((propName) => `${propName}:${String(propValue)};`)
    .join('')

  console.warn('createStyleString')
  console.log({ areaBreakpoint })
  console.log({ styleProps })

  // const breakpointOptions = Layout.breakpoints[breakpoint.name]

  // Wrap CSS rule in a media query only if its prop includes
  // a breakpoint and behavior different than the default ones.
  const shouldWrapInMediaQuery =
    !!areaBreakpoint && !(isDefault && behavior === Layout.defaultBehavior)

  console.log('has areaBreakpoint', !!areaBreakpoint)
  console.log('isDefault?', isDefault)
  console.log('has default beheavior', behavior === Layout.defaultBehavior)
  console.log({ shouldWrapInMediaQuery })

  if (shouldWrapInMediaQuery) {
    console.log('SHOULD wrap in media query...')
    const queryString = createMediaQuery(breakpoint, behavior)
    console.log('given this breakpoint:', breakpoint)
    console.log('given behavior:', behavior)
    console.log({ queryString })
    return `@media ${queryString} {${styleProps}}`
  }

  return styleProps
}

export default function applyStyles(pristineProps: Props): string {
  console.log('applyStyles for', pristineProps)

  const propsGroups = Object.keys(pristineProps)
    /* Filter out props with "undefined" or "null" as value */
    .filter((propName) => isset(pristineProps[propName]))
    /* Parse each prop to include "breakpoint" and "behavior" */
    .map(parsePropName)
    /* Filter out props that are not included in prop aliases */
    .filter(({ purePropName }) => propAliases.hasOwnProperty(purePropName))
    /* Map each prop to a CSS string */
    .reduce((groups, parsedPropName) => {
      const { purePropName } = parsedPropName
      const nextGroupEntry = groups[purePropName]
        ? groups[purePropName].concat(parsedPropName)
        : [parsedPropName]

      return {
        ...groups,
        [purePropName]: nextGroupEntry,
      }
    }, {})

  console.log(propsGroups)

  // This can be moved outside
  const createStyle = (parsedPropName) => {
    const { originPropName, purePropName, breakpoint } = parsedPropName
    const { props, transformValue } = propAliases[purePropName]
    const propValue = pristineProps[originPropName]
    const transformedPropValue = transformValue
      ? transformValue(propValue)
      : propValue

    return createStyleString(props, transformedPropValue, breakpoint)
  }

  const styles = Object.keys(propsGroups).reduce((acc, propName) => {
    const declarations = propsGroups[propName]
    const nextStyles = declarations.map((parsedPropName, index) => {
      const { behavior, breakpoint } = parsedPropName
      const goesDown = behavior === 'down'
      const prevDeclaration = declarations[index - 1]

      // Prevent multiple "down" responsive props
      // from overlapping.
      if (goesDown && prevDeclaration && prevDeclaration.behavior === 'down') {
        const actualBreakpoint = mergeBreakpoints(
          {
            ...Layout.breakpoints[breakpoint.name],
            behavior,
          },
          {
            ...Layout.breakpoints[prevDeclaration.breakpoint.name],
            behavior: 'up',
          },
          true,
        )

        // console.warn('combined down props!')
        // console.log(
        //   `prop ${parsedPropName.originPropName} has a predcessor ${prevDeclaration.originPropName}`,
        // )
        // console.log({ actualBreakpoint })

        return createStyle({
          ...parsedPropName,
          breakpoint: {
            ...breakpoint,
            behavior,
            values: actualBreakpoint,
          },
        })
      }

      return createStyle({
        ...parsedPropName,
        breakpoint: {
          ...breakpoint,
          behavior,
          values: Layout.breakpoints[breakpoint.name],
        },
      })
    })

    return acc.concat(nextStyles)
  }, [])
  // .join(' ')

  console.log({ styles })

  return styles
}
