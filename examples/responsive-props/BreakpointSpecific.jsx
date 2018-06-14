import React from 'react'
import { Composition } from '@lib'
import Square from '../../stories/Square'

const template = `'first second'`

const BreakpointSpecific = () => (
  <Composition
    id="composition"
    template={template}
    gutter={10}
    gutterSm={20}
    gutterMd={30}
    gutterLg={40}
    gutterXl={50}
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
)

export default BreakpointSpecific
