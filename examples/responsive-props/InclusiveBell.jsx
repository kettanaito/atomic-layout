import React from 'react'
import { Composition } from '@lib'
import Square from '../../stories/Square'

const template = `'first second'`

const Inclusive = () => (
  <React.Fragment>
    <Composition
      id="composition-one"
      template={template}
      padding={10}
      paddingSm={20}
      paddingXl={10}
    >
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
    <Composition
      id="composition-two"
      template={template}
      padding={10}
      paddingMdOnly={20}
    >
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
  </React.Fragment>
)

export default Inclusive
