import React from 'react'
import { Composition } from '@lib'
import Square from '../../stories/Square'

const template = `'first second'`

const MobileFirst = () => (
  <Composition template={template} gutter={10}>
    {({ First, Second }) => (
      <React.Fragment>
        <First>
          <Square id="first">First</Square>
        </First>
        <Second>
          <Square id="second">Second</Square>
        </Second>
      </React.Fragment>
    )}
  </Composition>
)

export default MobileFirst
