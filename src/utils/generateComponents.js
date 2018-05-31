import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive/dist/react-responsive.min'
import applyStyles from './applyStyles'

const capitalize = (str) => {
  return str.replace(/^./, (letter) => letter.toUpperCase())
}

const withPlaceholder = (Component, resolutionGroups) => {
  return ({ children }) =>
    resolutionGroups.map((resolutionGroup, index) => {
      const mediaQueryProps = {
        minWidth: resolutionGroup.from,
        maxWidth: resolutionGroup.to,
      }

      return (
        <MediaQuery
          key={`${Component.displayName}_${index}`}
          {...mediaQueryProps}
          component={Component}
        >
          {children}
        </MediaQuery>
      )
    })
}

const createArea = (areaName) => styled.div`
  grid-area: ${areaName};
  ${(props) => applyStyles(props)};
`

/**
 * Generates React components for the given areas.
 */
export default function generateComponents(areas) {
  return Object.keys(areas).reduce((components, areaName) => {
    const capitalizedAreaName = capitalize(areaName)
    const areaBreakpoints = areas[areaName]
    const shouldAlwaysRender = areaBreakpoints.every(
      (resolution) => !resolution.from && !resolution.to,
    )

    const AreaComponent = createArea(areaName)
    AreaComponent.displayName = capitalizedAreaName

    console.log('area:', areaName)
    console.log('areaBreakpoints:', areaBreakpoints)
    console.log('shouldAlwaysRender:', shouldAlwaysRender)

    const endComponent = shouldAlwaysRender
      ? AreaComponent
      : withPlaceholder(AreaComponent, areaBreakpoints)

    return Object.assign({}, components, {
      [capitalizedAreaName]: endComponent,
    })
  }, {})
}
