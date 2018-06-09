import React from 'react'
import { Composition } from '../../'
import Square from '../../stories/Square'

const template = `'first second'`
const templateSm = `'first second third'`
const templateLg = `'first second'`

export default class DefaultBehavior extends React.Component {
  render() {
    return (
      <Composition
        template={template}
        templateSm={templateSm}
        templateLg={templateLg}
        gutter={10}
      >
        {({ First, Second, Third }) => (
          <React.Fragment>
            <First>
              <Square id="first">First</Square>
            </First>
            <Second>
              <Square id="second">Second</Square>
            </Second>
            <Third>
              <Square id="third">Third</Square>
            </Third>
          </React.Fragment>
        )}
      </Composition>
    )
  }
}
