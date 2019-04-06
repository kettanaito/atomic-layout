import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const CompoundResponsiveProps = () => (
  <Composition
    id="composition"
    templateCols="200px"
    templateColsSmDown="100px"
    gutter={10}
  >
    <Square>First</Square>
    <Square>Second</Square>
  </Composition>
)

export default CompoundResponsiveProps
