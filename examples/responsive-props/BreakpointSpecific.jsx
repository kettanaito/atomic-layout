import React from 'react'
import Layout, { Composition } from 'atomic-layout'
import resetLayout from '../resetLayout'
import Square from '../../stories/Square'

resetLayout(Layout)

const template = `'first second'`

const BreakpointSpecific = () => (
  <Composition
    id="composition"
    areas={template}
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
