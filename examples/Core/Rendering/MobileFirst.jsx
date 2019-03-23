import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const MobileFirstBehavior = () => (
  <Composition areas="first second" gutter={10}>
    {({ First, Second }) => (
      <>
        <First id="mobile-first-first">
          <Square>First</Square>
        </First>
        <Second id="mobile-first-second">
          <Square>Second</Square>
        </Second>
      </>
    )}
  </Composition>
)

export default MobileFirstBehavior
