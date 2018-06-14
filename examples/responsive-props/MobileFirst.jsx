import React from 'react'
import { Composition } from '@lib'
import Square from '../../stories/Square'

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
