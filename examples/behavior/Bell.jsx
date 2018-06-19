import React from 'react'
import { Composition } from '@lib'
import Square from '../../stories/Square'

const template = `'first second'`
const templateMd = `'first'`
const templateLg = `'first second'`

const Bell = () => (
  <Composition
    template={template}
    templateMd={templateMd}
    templateLg={templateLg}
    gutter={10}
  >
    {({ First, Second }) => (
      <React.Fragment>
        <First id="first">
          <Square>First</Square>
        </First>
        <Second id="second">
          <Square>Second</Square>
        </Second>
      </React.Fragment>
    )}
  </Composition>
)

export default Bell
