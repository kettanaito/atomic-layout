// @flow
import type { TAreaParams } from '../breakpoints/getAreaBreakpoints'
import type { AreasList } from '../generateAreasList'
import * as React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import Box from '../../../components/Box'
import capitalize from '../../strings/capitalize'
import getAreaBreakpoints from '../../breakpoints/getAreaBreakpoints'

export type TAreaComponent = Class<React.Component<any, void, void>>
export type TAreaComponentsMap = {
  [componentName: string]: TAreaComponent,
}

/**
 * A high-order component that wraps the given area component in a placeholder.
 * This is used for conditional components, where placeholder component is rendered
 * until the condition for the area component is met (i.e. breakpoint).
 */
const withPlaceholder = (
  AreaComponent: TAreaComponent,
  areaParams: TAreaParams[],
) => {
  const Placeholder = ({ children, ...restProps }: { children: React.Node }) =>
    areaParams
      .filter(Boolean)
      .reduce((components, breakpointOptions, index) => {
        const { behavior, ...breakpointProps } = breakpointOptions

        return components.concat(
          <MediaQuery
            {...restProps}
            {...breakpointProps}
            key={`${AreaComponent.displayName}_${index}`}
            component={AreaComponent}
          >
            {children}
          </MediaQuery>,
        )
      }, [])

  Placeholder.displayName = `Placeholder(${AreaComponent.displayName})`

  return Placeholder
}

const createAreaComponent = (areaName: string): TAreaComponent => styled(Box)`
  grid-area: ${areaName};
`

/**
 * Returns a map of React components based on the given grid areas
 * in the given template definitions.
 */
export default function generateComponents({ areas, templates }: AreasList) {
  const componentsMap = areas.reduce((components, areaName) => {
    const areaParams = getAreaBreakpoints(areaName, templates)
    const shouldAlwaysRender =
      areaParams.length === 1 &&
      areaParams.every(
        (breakpoint) => !breakpoint.minWidth && !breakpoint.maxWidth,
      )

    const AreaComponent = createAreaComponent(areaName)
    const capitalizedAreaName = capitalize(areaName)
    AreaComponent.displayName = capitalizedAreaName

    const WrappedComponent = shouldAlwaysRender
      ? AreaComponent
      : withPlaceholder(AreaComponent, areaParams)

    return {
      ...components,
      [capitalizedAreaName]: WrappedComponent,
    }
  }, {})

  return new Proxy(componentsMap, {
    get(components, areaName) {
      if (areaName in components || typeof areaName === 'symbol') {
        return components[areaName]
      }

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
       */
      return () => null
    },
  })
}
