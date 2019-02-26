import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '../../stories/Square'

const template = 'first second'
const templateSm = 'first second third'
const templateLg = 'first second'

const Inclusive = ({ children }) => (
  <Composition
    areas={template}
    areasSm={templateSm}
    areasLg={templateLg}
    gutter={10}
  >
    {({ First, Second, Third }) => (
      <React.Fragment>
        <First id="inclusive-first">
          <Square>{children || 'First'}</Square>
        </First>
        <Second id="inclusive-second">
          <Square>Second</Square>
        </Second>
        <Third id="inclusive-third">
          <Square>Third</Square>
        </Third>
      </React.Fragment>
    )}
  </Composition>
)

export default Inclusive
