// @flow
import type { TBreakpoint } from '../const/defaultOptions'
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
  const Placeholder = ({ children }: { children: React.Node }) =>
    breakpoints.map((breakpointOptions, index) => {
      const { behavior, ...breakpointProps } = breakpointOptions

      return (
        <MediaQuery
          key={`${AreaComponent.displayName}_${index}`}
          {...breakpointProps}
          component={AreaComponent}
        >
          {children}
        </MediaQuery>
      )
    })
  Placeholder.displayName = `Placeholder(${AreaComponent.displayName})`

  return Placeholder
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

    // TODO
    // This logic doesn't cover breakpoints props like "aspectRatio"
    // and so on. That means that the component must still be wrapped
    // in the <MediaQuery/> wrapper.
    const shouldAlwaysRender = areaBreakpoints.every(
      (breakpoint) => !breakpoint.minWidth && !breakpoint.maxWidth,
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
