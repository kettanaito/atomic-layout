import React from 'react'
import { Only } from 'atomic-layout'
import Square from '../../stories/Square'

export default class OnlyExample extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Only for="sm">
          <Square id="first">First</Square>
        </Only>
        <Only to="md">
          <Square id="second">Second</Square>
        </Only>
        <Only from="lg">
          <Square id="third">Third</Square>
        </Only>
      </React.Fragment>
    )
  }
}
