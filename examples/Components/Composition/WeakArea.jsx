import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const WeakAreaRendering = () => (
  <Composition
    id="composition"
    areas="left right"
    areasMd="left center right"
    gap={10}
  >
    {({ Left, Center, Right, Extra }) => (
      <>
        <Left data-area="left">
          <Square>Left</Square>
        </Left>
        {/* Area present only in some definitions */}
        <Center data-area="center">
          <Square>Center</Square>
        </Center>
        <Right data-area="right">
          <Square>Right</Square>
        </Right>
        {/* Undefined area component */}
        <Extra data-area="extra">Foo</Extra>
      </>
    )}
  </Composition>
)

export default WeakAreaRendering
