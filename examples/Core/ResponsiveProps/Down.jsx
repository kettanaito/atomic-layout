import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const DownResponsiveProps = () => (
  <>
    {/* Multiple "down" behaviors */}
    <Composition
      id="composition-down"
      padding={10}
      paddingSmDown={20}
      paddingMdDown={30}
      paddingLgDown={40}
      paddingXlDown={50}
    >
      <Square>First</Square>
    </Composition>

    {/* Combination of "up" and "down" */}
    <Composition
      id="composition-combination"
      templateCols="200px"
      templateColsSmDown="100px"
      gutter={10}
    >
      <Square>First</Square>
      <Square>Second</Square>
    </Composition>
  </>
)
export default DownResponsiveProps
