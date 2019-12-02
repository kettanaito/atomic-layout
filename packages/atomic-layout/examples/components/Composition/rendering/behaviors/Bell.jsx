import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const template = 'first second'
const templateSm = 'first second third'
const templateLg = 'first second'

const BellBehavior = ({ children }) => (
  <Composition
    id="bell"
    areas={template}
    areasSm={templateSm}
    areasLg={templateLg}
    gutter={10}
  >
    {({ First, Second, Third }) => (
      <>
        <First data-area="first">
          <Square>{children || 'First'}</Square>
        </First>
        <Second data-area="second">
          <Square>Second</Square>
        </Second>
        <Third data-area="third">
          <Square>Third</Square>
        </Third>
      </>
    )}
  </Composition>
)

export default BellBehavior
