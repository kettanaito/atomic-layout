import React from 'react'
import { Visible } from 'atomic-layout'
import Square from '@stories/Square'

const VisibleDefaultBehavior = () => (
  <>
    {/* Explicit breakpoint */}
    <Visible id="first" for="sm">
      <Square>For "sm"</Square>
    </Visible>
    {/* High-pass */}
    <Visible id="second" to="md">
      <Square>To "md"</Square>
    </Visible>
    {/* Low-pass */}
    <Visible id="third" from="lg">
      <Square>From "lg"</Square>
    </Visible>
    {/* Bell */}
    <Visible id="fourth" from="sm" to="lg">
      <Square>From "sm" to "lg"</Square>
    </Visible>
    {/* Notch */}
    <Visible id="fifth" except from="md" to="lg">
      <Square>Except from "md" to "lg"</Square>
    </Visible>
  </>
)

export default VisibleDefaultBehavior
