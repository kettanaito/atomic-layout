import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '../../stories/Square'

const template = `'first second'`

const MobileFirst = () => (
  <Composition areas={template} gutter={10}>
    {({ First, Second }) => (
      <React.Fragment>
        <First id="mobile-first-first">
          <Square>First</Square>
        </First>
        <Second id="mobile-first-second">
          <Square>Second</Square>
        </Second>
      </React.Fragment>
    )}
  </Composition>
)

export default MobileFirst
