import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '../../stories/Square'

const template = `'first second'`
const templateMd = `'first'`
const templateLg = `'first second'`

const Notch = () => (
  <Composition
    template={template}
    templateMd={templateMd}
    templateLg={templateLg}
    gutter={10}
  >
    {({ First, Second }) => (
      <React.Fragment>
        <First id="notch-first">
          <Square>First</Square>
        </First>
        <Second id="notch-second">
          <Square>Second</Square>
        </Second>
      </React.Fragment>
    )}
  </Composition>
)

export default Notch
