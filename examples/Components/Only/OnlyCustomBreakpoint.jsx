import React from 'react'
import { Only } from 'atomic-layout'
import Square from '@stories/Square'

const OnlyCustomBreakpoint = () => (
  <>
    {/* Explicit */}
    <Only for={{ minWidth: 576, maxWidth: 767 }}>
      <Square id="first">First</Square>
    </Only>

    {/* High-pass */}
    <Only to={{ minWidth: 768, maxWidth: 991 }}>
      <Square id="second">Second</Square>
    </Only>

    {/* Low-pass */}
    <Only from={{ minWidth: 992, maxWidth: 1199 }}>
      <Square id="third">Third</Square>
    </Only>

    {/* Bell */}
    <Only
      from={{ minWidth: 576, maxWidth: 768 }}
      to={{ minWidth: 992, maxWidth: 1199 }}
    >
      <Square id="fourth">Fourth</Square>
    </Only>

    {/* Notch */}
    <Only
      except
      from={{ minWidth: 768, maxWidth: 991 }}
      to={{ minWidth: 992, maxWidth: 1199 }}
    >
      <Square id="fifth">Fifth</Square>
    </Only>
  </>
)

export default OnlyCustomBreakpoint
