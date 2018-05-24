import * as R from 'ramda'
import React from 'react'
// import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import mediaQueries from '../const/mediaQueries'
import applyStyles from './applyStyles'

const capitalize = R.replace(/^./, R.toUpper)

const createLayoutArea = (areaName) => styled.div`
  grid-area: ${areaName};
  ${(props) => applyStyles(props)};
`

const transformValue = R.compose(
  R.uniq,
  R.filter(Boolean),
  R.split(' '),
  R.trim,
  R.replace(/\r?\n|\r|\'/g, ''),
)

function areasToComponents({ areas, shared }) {
  console.log('areasToComponents')
  console.log('areas:', areas)

  return Object.keys(areas).reduce((components, areaName) => {
    const capitalizedAreaName = capitalize(areaName)
    const AreaComponent = createLayoutArea(areaName)

    if (shared.includes(areaName)) {
      components[capitalizedAreaName] = AreaComponent
      return components
    }

    const { mediaQuery, behavior } = areas[areaName]
    const screenSize = mediaQueries[mediaQuery]
    // const mediaQueryPropName = `${}Width`

    console.log({ areaName })
    console.log(areas[areaName])
    console.log({ mediaQuery })
    console.log({ behavior })
    console.log({ screenSize })

    // components[capitalizedAreaName] = (props) => (
    //   <MediaQuery maxWidth={100}>
    //     <AreaComponent {...props} />
    //   </MediaQuery>
    // )

    return components
  }, {})
}

const templateStringToArray = R.compose(
  areasToComponents,
  R.reduce(
    (acc, templateData) => {
      const { mediaQuery, behavior, propValue } = templateData
      const gridAreas = transformValue(propValue)

      console.log('reducing template...')
      console.log('templateData:', templateData)
      console.log('gridAreas:', gridAreas)

      const nextAreas = gridAreas.reduce((areas, areaName) => {
        const prevMediaQueries = areas[areaName] || []

        return Object.assign({}, areas, {
          [areaName]: prevMediaQueries.concat({
            behavior,
            mediaQuery: mediaQuery || 'xs',
          }),
        })
      }, acc.areas)

      // acc.areas = nextAreas

      const prevShared = acc.shared
      const nextShared = prevShared
        ? R.intersection(prevShared, gridAreas)
        : gridAreas

      console.log('next acc:', acc)
      console.log(' ')

      return {
        areas: nextAreas,
        shared: nextShared,
      }
    },
    { areas: {}, shared: null },
  ),
)

/**
 * Parse the given "grid-template-areas" value and generate
 * React components for each present area.
 * @param {string} template
 */
export default function parseTemplate(templates) {
  if (templates.length === 0) {
    return
  }

  console.warn('templates:', templates)

  /* Split the template areas into an array */
  const areaComponents = templateStringToArray(templates)

  console.warn('parseTemplate result:', areaComponents)

  return areaComponents
}
