import * as React from 'react'
import { BoxProps } from '../../../const/props'
import { AreasList } from '../getAreasList'
import { Breakpoint } from '../../../const/defaultOptions'
import capitalize from '../../strings/capitalize'
import getAreaRecords from '../../breakpoints/getAreaRecords'

export interface AreasMap {
  [componentName: string]: AreaComponent
}

export type AreaComponent = React.FC<BoxProps>

/**
 * Returns a map of React components based on the given grid areas
 * in the given template definitions.
 */
export default function generateComponents(
  { areas, templates }: AreasList,
  createAreaComponent: (areaName: string) => AreaComponent,
  withPlaceholder: (
    Component: AreaComponent,
    breakpoints: Breakpoint[],
  ) => AreaComponent,
): AreasMap {
  const componentsMap = areas.reduce<AreasMap>((components, areaName) => {
    const areaRecords = getAreaRecords(areaName, templates)
    const areaBreakpoints = areaRecords
      .filter(Boolean)
      .map((areaRecord) => areaRecord.breakpoint)
    const shouldAlwaysRender =
      areaRecords.length === 1 &&
      areaBreakpoints.every(
        (breakpoint) => !breakpoint.minWidth && !breakpoint.maxWidth,
      )

    const Component = createAreaComponent(areaName)
    const capitalizedAreaName = capitalize(areaName)
    Component.displayName = `Area(${capitalizedAreaName})`

    const ResponsiveComponent = shouldAlwaysRender
      ? Component
      : withPlaceholder(Component, areaBreakpoints)

    return {
      ...components,
      [capitalizedAreaName]: ResponsiveComponent,
    }
  }, {})

  // Return plain components map for browsers that don't support Proxy.
  // Requires safety check before rendering conditional areas.
  return typeof Proxy === 'undefined'
    ? componentsMap
    : new Proxy<AreasMap>(componentsMap, {
        get(components, areaName: string) {
          if (areaName in components || typeof areaName === 'symbol') {
            return components[areaName]
          }

          if (!__PROD__) {
            // tslint:disable-next-line
            console.warn(
              'Prevented render of the area "%s", which is not found in the template definition. Please render one of the existing areas ("%s"), or modify the template to include "%s".',
              areaName,
              areas
                // Filter out "." placeholder from the list of areas
                .filter((singleAreaName) => /\w+/.test(singleAreaName))
                // Sort areas alphabetically for easier eye navigation
                .sort()
                // Capitalize areas to correspond to area components
                .map(capitalize)
                .join('", "'),
              areaName.toLowerCase(),
            )
          }

          // Replace non-existing area component with
          // the dummy component that renders nothing.
          // This prevents from the exception when rendering "undefined"
          // and allows dynamic runtime template areas.
          return (): void => null
        },
      })
}
