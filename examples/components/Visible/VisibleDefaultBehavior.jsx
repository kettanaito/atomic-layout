import React from 'react'
import { Visible } from 'atomic-layout'
import Square from '@stories/Square'

const VisibleDefaultBehavior = () => (
  <>
    {/* Explicit breakpoint */}
    <Visible for="sm">
      <Square id="first">For "sm"</Square>
    </Visible>
    {/* High-pass */}
    <Visible to="md">
      <Square id="second">To "md"</Square>
    </Visible>
    {/* Low-pass */}
    <Visible from="lg">
      <Square id="third">From "lg"</Square>
    </Visible>
    {/* Bell */}
    <Visible from="sm" to="lg">
      <Square id="fourth">From "sm" to "lg"</Square>
    </Visible>
    {/* Notch */}
    <Visible except from="md" to="lg">
      <Square id="fifth">Except from "md" to "lg"</Square>
    </Visible>{' '}
  </>
)

export default VisibleDefaultBehavior
