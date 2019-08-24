import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const areasMobile = `left right`
const areasTablet = `left center right`

const BreakpointEdges = () => (
  <Composition
    id="composition"
    areas={areasMobile}
    areasMd={areasTablet}
    gap={10}
    maxWidth={300}
    maxWidthSm={600}
    maxWidthLg={900}
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

export default BreakpointEdges
