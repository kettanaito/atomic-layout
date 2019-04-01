import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const template = 'first second'
const templateMd = 'first'
const templateLg = 'first second'

const NotchBehavior = () => (
  <Composition
    areas={template}
    areasMd={templateMd}
    areasLg={templateLg}
    gutter={10}
  >
    {({ First, Second }) => (
      <>
        <First id="notch-first">
          <Square>First</Square>
        </First>
        <Second id="notch-second">
          <Square>Second</Square>
        </Second>
      </>
    )}
  </Composition>
)

export default NotchBehavior
