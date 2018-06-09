import React from 'react'
import { Composition } from '../../'
import Square from '../Square'

const template = `'first second'`
const templateSm = `'first second third'`
const templateLg = `'first second'`

export default class DefaultBehavior extends React.Component {
  render() {
    return (
      <Composition
        id="inclusive"
        template={template}
        templateSm={templateSm}
        templateLg={templateLg}
        gutter={10}
      >
        {({ First, Second, Third }) => (
          <React.Fragment>
            <First>
              <Square>First</Square>
            </First>
            <Second>
              <Square>Second</Square>
            </Second>
            <Third>
              <Square>Third</Square>
            </Third>
          </React.Fragment>
        )}
      </Composition>
    )
  }
}
