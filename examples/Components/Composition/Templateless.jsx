import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const TemplatelessComposition = () => (
  <Composition templateCols="200px 300px 400px" gutter={10}>
    <>
      <Square id="first">First</Square>
      <Square id="second">Second</Square>
      <Square id="third">Third</Square>
    </>
  </Composition>
)

export default TemplatelessComposition
