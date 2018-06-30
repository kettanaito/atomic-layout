import React from 'react'
import Layout, { Composition } from 'atomic-layout'
import resetLayout from '../resetLayout'
import Square from '../../stories/Square'

resetLayout(Layout)

const template = `'first second'`

const Foo = () => (
  <Composition id="composition" template={template} gutter={10}>
    {({ First, Second }) => (
      <React.Fragment>
        <First>
          <Square>First</Square>
        </First>
        <Second>
          <Square>Second</Square>
        </Second>
      </React.Fragment>
    )}
  </Composition>
)

export default Foo
