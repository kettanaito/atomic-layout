import { useState } from 'react'
import useBreakpointChange from './useBreakpointChange'
import withBreakpoints from '@utils/breakpoints/withBreakpoints'

/**
 * Accepts a map of { breakpointName: value } pairs
 * and returns a value based on the current viewport.
 * Returns default value when no matching pair is found.
 */
const useResponsiveValue = <T>(
  breakpoints: Record<string, T>,
  defaultValue?: T,
): T => {
  const [value, updateValue] = useState<T>(defaultValue)

  useBreakpointChange(() => {
    const nextValue = withBreakpoints<T>(breakpoints, defaultValue)
    updateValue(nextValue)
  })

  return value
}

export default useResponsiveValue
