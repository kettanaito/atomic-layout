import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '../../stories/Square'

const template = `
first
second
`

const TemplateIndentation = () => (
  <Composition template={template} gutter={10}>
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

export default TemplateIndentation
