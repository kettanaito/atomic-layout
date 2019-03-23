import React from 'react'
import Layout, { Composition } from 'atomic-layout'
// import resetLayout from '../resetLayout'
import Square from '@stories/Square'

// resetLayout(Layout)

const template = 'first second'

const InclusiveNotch = () => (
  <>
    <Composition
      id="composition-one"
      areas={template}
      padding={10}
      paddingSm={20}
      paddingXl={10}
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

    <Composition
      id="composition-two"
      template={template}
      padding={10}
      paddingMdOnly={20}
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
  </>
)

export default InclusiveNotch
