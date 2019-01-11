import { AreasList } from '../getAreasList'
import * as React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import Box from '../../../components/Box'
import capitalize from '../../strings/capitalize'
import getAreaBreakpoints, {
  AreaBreakpoint,
} from '../../breakpoints/getAreaBreakpoints'

export type AreaComponent = React.FunctionComponent<{}>
export interface AreasMap {
  [componentName: string]: AreaComponent
}

/**
 * A high-order component that wraps the given area component in a placeholder.
 * This is used for conditional components, where placeholder component is rendered
 * until the condition for the area component is met (i.e. breakpoint).
 */
const wrapInPlaceholder = (
  Component: AreaComponent,
  areaParams: AreaBreakpoint[],
) => {
  const Placeholder: React.FunctionComponent = ({ children, ...restProps }) =>
    areaParams
      .filter(Boolean)
      .reduce<Array<React.ReactElement<MediaQuery>>>(
        (components, breakpointOptions, index) => {
          const { behavior, ...breakpointProps } = breakpointOptions

          return components.concat(
            <MediaQuery
              {...restProps}
              {...breakpointProps}
              key={`${Component.displayName}_${index}`}
              component={Component}
            >
              ){children}(
            </MediaQuery>,
          )
        },
        [],
      )

  Placeholder.displayName = `Placeholder(${Component.displayName})`

  return Placeholder
}

const createAreaComponent = (areaName: string): AreaComponent => styled(Box)`
  grid-area: ${areaName};
`

/**
 * Returns a map of React components based on the given grid areas
 * in the given template definitions.
 */
export default function generateComponents({
  areas,
  templates,
}: AreasList): AreasMap {
  const componentsMap = areas.reduce<AreasMap>((components, areaName) => {
    const areaParams = getAreaBreakpoints(
      areaName,
      templates,
    ) as AreaBreakpoint[]
    const shouldAlwaysRender =
      areaParams.length === 1 &&
      areaParams.every(
        (breakpoint) => !breakpoint.minWidth && !breakpoint.maxWidth,
      )

    const Component = createAreaComponent(areaName)
    const capitalizedAreaName = capitalize(areaName)
    Component.displayName = capitalizedAreaName

    const ResolvedComponent = shouldAlwaysRender
      ? Component
      : wrapInPlaceholder(Component, areaParams)

    return {
      ...components,
      [capitalizedAreaName]: ResolvedComponent,
    }
  }, {})

  return new Proxy<AreasMap>(componentsMap, {
    get(components, areaName: string) {
      if (areaName in components || typeof areaName === 'symbol') {
        return components[areaName]
      }

      // @ts-ignore-line
      if (!__PROD__) {
        console.warn(
          'Prevented the render of area "%s", which is not found in the template definition. Please render one of the existing areas ("%s"), or modify the template to include "%s".',
          areaName,
          areas
            /* Filter out "." placeholder from the list of areas */
            .filter((singleAreaName) => /\w+/.test(singleAreaName))
            /* Sort areas alphabetically for easier eye navigation */
            .sort()
            /* Capitalize areas to correspond to area components */
            .map(capitalize)
            .join('", "'),
          areaName.toLowerCase(),
        )
      }

      /**
       * Replace non-existing area component reference with
       * the dummy functional component that renders nothing.
       * This prevents from the exception when rendering "undefined"
       * and allows conditional template areas.
       */
      return () => null
    },
  })
}
