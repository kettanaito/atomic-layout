import React from 'react'
import { Only } from 'atomic-layout'
import Square from '@stories/Square'

export const breakpoints = {
  mobile: {
    minWidth: 500,
    maxWidth: 600,
  },
  largeMobile: {
    minWidth: 601,
    maxWidth: 700,
  },
  tablet: {
    minWidth: 701,
    maxWidth: 800,
  },
  desktop: {
    minWidth: 801,
    maxWidth: 1200,
  },
}

const OnlyCustomBreakpoint = () => (
  <section>
    {/* Exact breakpoint */}
    <Only for={breakpoints.mobile}>
      <Square id="first">First</Square>
    </Only>

    {/* High-pass */}
    <Only to={breakpoints.tablet}>
      <Square id="second">Second</Square>
    </Only>

    {/* Low-pass */}
    <Only from={breakpoints.tablet}>
      <Square id="third">Third</Square>
    </Only>

    {/* Bell */}
    <Only from={breakpoints.largeMobile} to={breakpoints.desktop}>
      <Square id="fourth">Fourth</Square>
    </Only>

    {/* Notch */}
    <Only except from={breakpoints.largeMobile} to={breakpoints.desktop}>
      <Square id="fifth">Fifth</Square>
    </Only>
  </section>
)

export default OnlyCustomBreakpoint
