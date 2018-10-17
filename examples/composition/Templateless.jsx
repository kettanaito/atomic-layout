import React from 'react'
import { Composition } from 'atomic-layout'

export default class Templateless extends React.Component {
  render() {
    return (
      <Composition templateCols="200px 300px 400px" gutter={10}>
        <React.Fragment>
          <div id="first">First</div>
          <div id="second">Second</div>
          <div id="third">Third</div>
        </React.Fragment>
      </Composition>
    )
  }
}
