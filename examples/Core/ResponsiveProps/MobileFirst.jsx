import React from 'react'
import Layout, { Composition } from 'atomic-layout'
// import resetLayout from '../resetLayout'
import Square from '@stories/Square'

// resetLayout(Layout)

const Foo = () => (
  <Composition id="composition" areas="first second" gutter={10}>
    {({ First, Second }) => (
      <>
        <First>
          <Square>First</Square>
        </First>
        <Second>
          <Square>Second</Square>
        </Second>
      </>
    )}
  </Composition>
)

export default Foo
