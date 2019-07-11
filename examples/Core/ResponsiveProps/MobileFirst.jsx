import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

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
