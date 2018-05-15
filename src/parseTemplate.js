import * as R from 'ramda'
import styled from 'styled-components'
import applyStyles from './applyStyles'

const createLayoutArea = (areaName) => styled.div`
  grid-area: ${areaName};
  ${(props) => applyStyles(props)};
`

const templateStringToArray = R.compose(
  R.reduce((acc, areaName) => {
    const capitalizedAreaName = R.replace(/^./, R.toUpper)(areaName)
    const AreaComponent = createLayoutArea(areaName)
    AreaComponent.displayName = `LayoutArea(${capitalizedAreaName})`
    acc[capitalizedAreaName] = createLayoutArea(areaName)
    return acc
  }, {}),
  R.uniq,
  R.filter(Boolean),
  R.split(' '),
  R.trim,
  R.replace(/\r?\n|\r|\'/g, ''),
)

/**
 * Parse the given "grid-template-areas" value and generate
 * React components for each present area.
 * @param {string} template
 */
export default function parseTemplate(template) {
  if (!template) {
    return
  }

  /* Split the template areas into an array */
  const areaComponents = templateStringToArray(template)

  console.log({ areaComponents })

  return areaComponents
}
