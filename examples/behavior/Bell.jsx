import React from 'react'
import { Composition } from '../../'
import Square from '../../stories/Square'

const template = `'first second'`
const templateMd = `'first'`
const templateLg = `'first second'`

export default class Bell extends React.Component {
  render() {
    return (
      <Composition
        template={template}
        templateMd={templateMd}
        templateLg={templateLg}
        gutter={10}
      >
        {({ First, Second }) => (
          <React.Fragment>
            <First>
              <Square id="first">First sss</Square>
            </First>
            <Second>
              <Square id="second">Second</Square>
            </Second>
          </React.Fragment>
        )}
      </Composition>
    )
  }
}
