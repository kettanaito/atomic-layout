import * as React from 'react'
import {
  mergeAreaRecords,
  openBreakpoint,
  closeBreakpoint,
} from '@atomic-layout/core'
import {
  OnlyProps,
  createWrapper,
  resolveBreakpoint,
} from '../../../atomic-layout/src/components/Only'
import Box from './Box'

const Only: React.FC<OnlyProps> = ({
  children,
  except,
  for: exactBreakpointName,
  from: minBreakpointName,
  to: maxBreakpointName,
  ...restProps
}) => {
  const wrapWith = createWrapper(Box, children, restProps)

  // Render on explicit breakpoint
  if (exactBreakpointName) {
    return wrapWith(resolveBreakpoint(exactBreakpointName))
  }

  const minBreakpoint = resolveBreakpoint(minBreakpointName)
  const maxBreakpoint = resolveBreakpoint(maxBreakpointName)

  // Bell, __/--\__
  if (minBreakpoint && maxBreakpoint && !except) {
    const mergedAreaRecord = mergeAreaRecords(
      {
        behavior: 'down',
        breakpoint: maxBreakpoint,
      },
      {
        behavior: 'up',
        breakpoint: minBreakpoint,
      },
      false,
    )

    return wrapWith(mergedAreaRecord.breakpoint)
  }

  // Notch, --\__/--
  if (minBreakpoint && maxBreakpoint && except) {
    return wrapWith(
      closeBreakpoint(minBreakpoint),
      openBreakpoint(maxBreakpoint),
    )
  }

  // High-pass, __/--
  if (minBreakpoint && !maxBreakpoint) {
    return wrapWith(openBreakpoint(minBreakpoint))
  }

  // Low-pass, --\__
  if (!minBreakpoint && maxBreakpoint) {
    return wrapWith(closeBreakpoint(maxBreakpoint))
  }

  // Render always when no constrains are provided
  return <>children</>
}

export default Only
