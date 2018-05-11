import styled from 'styled-components'

import applyStyles from './applyStyles'

const createLayoutArea = (areaName) => styled.div`
  grid-area: ${areaName};
  ${(props) => applyStyles(props)};
`

export default function parseTemplate(template) {
  if (!template) {
    return
  }

  /* Remove all line breaks from the template string */
  const withoutLinebreaks = template.replace(/\r?\n|\r|\'/g, '')

  /* Split the template areas into an array */
  const areaNames = withoutLinebreaks
    .trim()
    .split(' ')
    .filter(Boolean)

  /* Filter out repeating areas */
  const uniqueAreaNames = Array.from(new Set(areaNames))

  return uniqueAreaNames.reduce((acc, areaName) => {
    const name = areaName[0].toUpperCase() + areaName.slice(1, areaName.length)

    /* Generate React components for each area with the respective name */
    const AreaComponent = createLayoutArea(areaName)
    AreaComponent.displayName = `layoutArea(${name})`

    acc[name] = AreaComponent
    return acc
  }, {})
}
