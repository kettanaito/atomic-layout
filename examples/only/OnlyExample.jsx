import React from 'react'
import { Only } from 'atomic-layout'
import Square from '../../stories/Square'

export default class OnlyExample extends React.Component {
  render() {
    return (
      <>
        {/* Explicit */}
        <Only for="sm">
          <Square id="first">First</Square>
        </Only>

        {/* High-pass */}
        <Only to="md">
          <Square id="second">Second</Square>
        </Only>

        {/* Low-pass */}
        <Only from="lg">
          <Square id="third">Third</Square>
        </Only>

        {/* Bell */}
        <Only from="sm" to="lg">
          <Square id="fourth">Fourth</Square>
        </Only>

        {/* Notch */}
        <Only except from="md" to="lg">
          <Square id="fifth">Fifth</Square>
        </Only>
      </>
    )
  }
}
