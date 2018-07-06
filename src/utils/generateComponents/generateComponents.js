// @flow
import type { TAreaParams } from '../getAreaBreakpoints'
import type { TAreasList } from '../getAreasList'
import * as React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive/dist/react-responsive.min'
import capitalize from '../strings/capitalize'
import getAreaBreakpoints from '../getAreaBreakpoints'
import applyStyles from '../applyStyles'

export type TAreaComponent = Class<React.Component<any, void, void>>
export type TAreaComponentsMap = {
  [componentName: string]: TAreaComponent,
}

const withPlaceholder = (
  AreaComponent: TAreaComponent,
  areaParams: TAreaParams[],
) => {
  const Placeholder = ({ children, ...restProps }: { children: React.Node }) =>
    areaParams.reduce((components, breakpointOptions, index) => {
      if (!breakpointOptions) {
        return components
      }

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

const createArea = (areaName: string): TAreaComponent => styled.div`
  grid-area: ${areaName};
  ${(props) => applyStyles(props)};
`

/**
 * Returns a map of React components based on the given grid areas
 * in the given template definitions.
 */
export default function generateComponents({ areas, templates }: TAreasList) {
  return areas.reduce((components, areaName) => {
    const areaParams = getAreaBreakpoints(areaName, templates)
    const shouldAlwaysRender =
      areaParams.length === 1 &&
      areaParams.every((breakpoint) => {
        return !breakpoint.minWidth && !breakpoint.maxWidth
      })

    const AreaComponent = createArea(areaName)
    const capitalizedAreaName = capitalize(areaName)
    AreaComponent.displayName = capitalizedAreaName

    const endComponent = shouldAlwaysRender
      ? AreaComponent
      : withPlaceholder(AreaComponent, areaParams)

    return {
      ...components,
      [capitalizedAreaName]: endComponent,
    }
  }, {})
}
