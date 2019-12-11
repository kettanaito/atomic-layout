import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const Scenario = () => (
  <Composition id="composition" areas="left center right" gutter={10}>
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
