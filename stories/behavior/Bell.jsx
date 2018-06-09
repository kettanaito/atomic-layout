import React from 'react'
import { Composition } from '../../'
import Square from '../Square'

const template = `first second`
const templateMd = `first`
const templateLg = `first second`

export default class Bell extends React.Component {
  render() {
    return (
      <Composition
        id="bell"
        template={template}
        templateMd={templateMd}
        templateLg={templateLg}
        gutter={10}
      >
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
