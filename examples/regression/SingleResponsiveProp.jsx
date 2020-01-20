import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const SingleResponsiveProp = () => (
  <Composition
    id="composition"
    areasMd="left right"
    paddingMdDown={15}
    gutterLgOnly={10}
  >
    {(Areas) => (
      <>
        <Areas.Left data-area="left">
          <Square>Left</Square>
        </Areas.Left>
        <Areas.Right data-area="right">
          <Square>Right</Square>
        </Areas.Right>
      </>
    )}
  </Composition>
)

export default SingleResponsiveProp
