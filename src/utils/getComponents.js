// @flow
import type { TBreakpoint } from '../const/defaultOptions'
import * as React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive/dist/react-responsive.min'

import getAreaBreakpoints from './getAreaBreakpoints'
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
    breakpoints.reduce((components, breakpointOptions, index) => {
      if (!breakpointOptions) {
        return components
      }

      const { behavior, ...breakpointProps } = breakpointOptions

      return components.concat(
        <MediaQuery
          key={`${AreaComponent.displayName}_${index}`}
          {...breakpointProps}
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

export default function getComponents({ areas, templates }) {
  return areas.reduce((components, areaName) => {
    const areaBreakpoints = getAreaBreakpoints(areaName, templates)
    const capitalizedAreaName = capitalize(areaName)
    const shouldAlwaysRender =
      areaBreakpoints.length === 1 &&
      areaBreakpoints.every((breakpoint) => {
        return !breakpoint.minWidth && !breakpoint.maxWidth
      })
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
