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

  const withoutLinebreaks = template.replace(/\r?\n|\r|\'/g, '')
  const areaNames = withoutLinebreaks
    .trim()
    .split(' ')
    .filter(Boolean)
  const uniqueAreaNames = Array.from(new Set(areaNames))

  return uniqueAreaNames.reduce((acc, areaName) => {
    const name = areaName[0].toUpperCase() + areaName.slice(1, areaName.length)
    const AreaComponent = createLayoutArea(areaName)
    AreaComponent.displayName = 'withStyle(LayoutArea)'
    acc[name] = AreaComponent

    return acc
  }, {})
}
