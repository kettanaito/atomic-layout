import React from 'react'
import { Composition } from '../../'
import Square from '../Square'

const template = `
  'first second'
`

export default class DefaultBehavior extends React.Component {
  render() {
    return (
      <Composition id="default" template={template} gutter={10}>
        {({ First, Second }) => (
          <React.Fragment>
            <First>
              <Square>First</Square>
            </First>
            <Second>
              <Square>Second</Square>
            </Second>
          </React.Fragment>
        )}
      </Composition>
    )
  }
}
