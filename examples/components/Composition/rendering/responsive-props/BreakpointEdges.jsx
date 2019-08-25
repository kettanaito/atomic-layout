import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const BreakpointEdges = () => (
  <Composition
    id="composition"
    templateCols="20% 1fr"
    gap={10}
    maxWidthDown={200}
    maxWidthSm={400}
    maxWidthLg="100%"
    marginHorizontal="auto"
  >
    <Square>Left</Square>
    <Square>Right</Square>
  </Composition>
)

export default BreakpointEdges
