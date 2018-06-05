// @flow
import type { TBreakpoint } from '../const/breakpoints'
import type { TAreaBreakpoint, TAreasCollection } from './reduceAreas'
import * as React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive/dist/react-responsive.min'
import capitalize from './capitalize'
import applyStyles from './applyStyles'

export type TAreaComponent = Class<React.Component<any, void, void>>
export type TAreaComponentsMap = {
  [componentName: string]: TAreaComponent,
}

const withPlaceholder = (
  AreaComponent: TAreaComponent,
  breakpoints: TAreaBreakpoint[],
) => {
  return ({ children }: { children: React.Node }) =>
    breakpoints.map((resolutionGroup, index) => {
      const mediaQueryProps = {
        minWidth: resolutionGroup.from,
        maxWidth: resolutionGroup.to,
      }

      return (
        <MediaQuery
          key={`${AreaComponent.displayName}_${index}`}
          {...mediaQueryProps}
          component={AreaComponent}
        >
          {children}
        </MediaQuery>
      )
    })
}

const createArea = (areaName: string): TAreaComponent => styled.div`
  grid-area: ${areaName};
  ${(props) => applyStyles(props)};
`

/**
 * Generates React components for the given grid areas.
 */
export default function generateComponents(
  areas: TAreasCollection,
): TAreaComponentsMap {
  return Object.keys(areas).reduce((components, areaName) => {
    const capitalizedAreaName = capitalize(areaName)
    const areaBreakpoints = areas[areaName]
    const shouldAlwaysRender = areaBreakpoints.every(
      (breakpoint) => !breakpoint.from && !breakpoint.to,
    )

    const AreaComponent = createArea(areaName)
    AreaComponent.displayName = capitalizedAreaName

    const endComponent = shouldAlwaysRender
      ? AreaComponent
      : withPlaceholder(AreaComponent, areaBreakpoints)

    return Object.assign({}, components, {
      [capitalizedAreaName]: endComponent,
    })
  }, {})
}
