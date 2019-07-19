import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const template = `
first
second
`

const TemplateIndentation = () => (
  <Composition areas={template} gutter={10}>
    {({ First, Second }) => (
      <>
        <First id="first">
          <Square>First</Square>
        </First>
        <Second id="second">
          <Square>Second</Square>
        </Second>
      </>
    )}
  </Composition>
)

export default TemplateIndentation
