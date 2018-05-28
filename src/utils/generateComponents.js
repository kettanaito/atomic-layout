import * as R from 'ramda'
import React from 'react'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import resolutions from '../const/resolutions'
import applyStyles from './applyStyles'
import getResponsiveGroups from './responsive/getResponsiveGroups'

const capitalize = R.replace(/^./, R.toUpper)

const wrap = (Component, resolutionGroups) => {
  return ({ children }) =>
    resolutionGroups.map((resolutionGroup, i) => {
      const mediaQueryProps = {
        minWidth: resolutionGroup.from,
        maxWidth: resolutionGroup.to,
      }

      return (
        <MediaQuery
          key={`${Component.displayName}_${i}`}
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
    const areaResolutions = areas[areaName]
    const shouldAlwaysRender = areaResolutions.every(
      (resolution) => !resolution.from && !resolution.to,
    )

    const AreaComponent = createArea(areaName)
    AreaComponent.displayName = capitalizedAreaName

    const endComponent = shouldAlwaysRender
      ? AreaComponent
      : wrap(AreaComponent, areaResolutions)

    return Object.assign({}, components, {
      [capitalizedAreaName]: endComponent,
    })
  }, {})
}
