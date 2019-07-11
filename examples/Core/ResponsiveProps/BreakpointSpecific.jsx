import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const BreakpointSpecific = () => (
  <Composition
    id="composition"
    areas="first second"
    gutter={10}
    gutterSm={20}
    gutterMd={30}
    gutterLg={40}
    gutterXl={50}
  >
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

export default BreakpointSpecific
