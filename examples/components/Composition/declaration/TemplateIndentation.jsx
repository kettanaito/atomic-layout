import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const unindentedAreas = `
first
second
`

const terriblyIndentedAreas = `
          third
    fourth
`

const TemplateIndentation = () => (
  <>
    <Composition areas={unindentedAreas} gutter={10}>
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

    <Composition areas={terriblyIndentedAreas} gutter={10}>
      {({ Third, Fourth }) => (
        <>
          <Third id="third">
            <Square>Third</Square>
          </Third>
          <Fourth id="fourth">
            <Square>Fourh</Square>
          </Fourth>
        </>
      )}
    </Composition>
  </>
)

export default TemplateIndentation
