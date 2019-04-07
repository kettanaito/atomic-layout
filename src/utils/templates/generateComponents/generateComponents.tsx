import { AreasList } from '../getAreasList'
import * as React from 'react'
import { Breakpoint } from '@const/defaultOptions'
import { GenericProps } from '@const/props'
import MediaQuery from '@components/MediaQuery'
import Box, { BoxProps } from '@components/Box'
import capitalize from '@utils/strings/capitalize'
import getAreaBreakpoints from '@utils/breakpoints/getAreaBreakpoints'

export type AreaComponent = React.FunctionComponent<BoxProps>
export interface AreasMap {
  [componentName: string]: AreaComponent
}

/**
 * A high-order component that wraps the given area component in a placeholder.
 * This is used for conditional components, where placeholder component is rendered
 * until the condition for the area component is met (i.e. breakpoint).
 */
export const withPlaceholder = (
  Component: AreaComponent,
  breakpoints: Breakpoint[],
) => {
  const Placeholder = ({
    children,
    ...restProps
  }: {
    children: React.ReactNode
  } & GenericProps) =>
    breakpoints.filter(Boolean).reduce((components, breakpointProps, index) => {
      const { behavior, ...queryProps } = breakpointProps

      return components.concat(
        <MediaQuery {...queryProps} key={`${Component.displayName}_${index}`}>
          {(matches) =>
            matches && <Component {...restProps}>{children}</Component>
          }
        </MediaQuery>,
      )
    }, [])

  Placeholder.displayName = `Placeholder(${Component.displayName})`

  return Placeholder
}

const createAreaComponent = (areaName: string): AreaComponent => (props) => (
  <Box area={areaName} {...props} />
)

/**
 * Returns a map of React components based on the given grid areas
 * in the given template definitions.
 */
export default function generateComponents({
  areas,
  templates,
}: AreasList): AreasMap {
  const componentsMap = areas.reduce<AreasMap>((components, areaName) => {
    const areaParams = getAreaBreakpoints(areaName, templates)
    const shouldAlwaysRender =
      areaParams.length === 1 &&
      areaParams.every(
        (breakpoint) => !breakpoint.minWidth && !breakpoint.maxWidth,
      )

    const Component = createAreaComponent(areaName)
    const capitalizedAreaName = capitalize(areaName)
    Component.displayName = capitalizedAreaName

    const ResponsiveComponent = shouldAlwaysRender
      ? Component
      : withPlaceholder(Component, areaParams)

    return {
      ...components,
      [capitalizedAreaName]: ResponsiveComponent,
    }
  }, {})

  /**
   * Return plain components map for browsers that don't support Proxy.
   * Requires safety check before rendering conditional areas.
   */
  return typeof Proxy === 'undefined'
    ? componentsMap
    : new Proxy<AreasMap>(componentsMap, {
        get(components, areaName: string) {
          if (areaName in components || typeof areaName === 'symbol') {
            return components[areaName]
          }

          // @ts-ignore-line
          if (!__PROD__) {
            console.warn(
              'Prevented render of the area "%s", which is not found in the template definition. Please render one of the existing areas ("%s"), or modify the template to include "%s".',
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
           * Replace non-existing area component with
           * the dummy component that renders nothing.
           * This prevents from the exception when rendering "undefined"
           * and allows conditional template areas.
           */
          return () => null
        },
      })
}
