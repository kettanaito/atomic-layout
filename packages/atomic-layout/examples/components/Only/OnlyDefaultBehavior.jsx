import React from 'react'
import { Only } from 'atomic-layout'
import Square from '@stories/Square'

const OnlyDefault = () => (
  <>
    {/* Exact breakpoint */}
    <Only for="sm">
      <Square id="first">For "sm"</Square>
    </Only>

    {/* High-pass */}
    <Only to="md">
      <Square id="second">To "md"</Square>
    </Only>

    {/* Low-pass */}
    <Only from="lg">
      <Square id="third">From "lg"</Square>
    </Only>

    {/* Bell */}
    <Only from="sm" to="lg">
      <Square id="fourth">From "sm" to "lg"</Square>
    </Only>

    {/* Notch */}
    <Only except from="md" to="lg">
      <Square id="fifth">Except from "md" to "lg"</Square>
    </Only>
  </>
)

export default OnlyDefault
