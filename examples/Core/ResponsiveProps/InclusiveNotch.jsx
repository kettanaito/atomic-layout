import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

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
