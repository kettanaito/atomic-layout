import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const template = 'left center right'
const templateMd = 'left right'
const templateLg = 'left center right'

const Scenario = () => (
  <Composition
    id="notch"
    areas={template}
    areasMd={templateMd}
    areasLg={templateLg}
    gutter={10}
  >
    {({ Left, Center, Right }) => (
      <>
        <Left data-area="left">
          <Square>Left</Square>
        </Left>
        <Center data-area="center">
          <Square>Center</Square>
        </Center>
        <Right data-area="right">
          <Square>Right</Square>
        </Right>
      </>
    )}
  </Composition>
)

export default Scenario
