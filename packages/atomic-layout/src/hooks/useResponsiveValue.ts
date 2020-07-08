import { useState, useEffect } from 'react'
import { withBreakpoints } from '@atomic-layout/core'
import useBreakpointChange from './useBreakpointChange'

/**
 * Accepts a map of { breakpointName: value } pairs
 * and returns a value based on the current viewport.
 * Returns default value when no matching pair is found.
 */
const useResponsiveValue = <ValueType>(
  breakpoints: Record<string, ValueType>,
  defaultValue?: ValueType,
): ValueType => {
  const [value, setValue] = useState<ValueType>(defaultValue)

  const callback = () => {
    const nextValue = withBreakpoints<ValueType>(breakpoints, defaultValue)
    setValue(nextValue)
  }

  useEffect(callback, [breakpoints, defaultValue])

  useBreakpointChange(callback)

  return value
}

export default useResponsiveValue
