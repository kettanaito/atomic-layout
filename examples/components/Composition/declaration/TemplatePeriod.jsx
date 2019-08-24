import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const areas = `
  left . right
`

const TemplatePeriod = () => (
  <Composition areas={areas} gap={10}>
    {({ Left, Right }) => (
      <>
        <Left id="left">
          <Square>Left</Square>
        </Left>
        <Right id="right">
          <Square>Right</Square>
        </Right>
      </>
    )}
  </Composition>
)

export default TemplatePeriod
