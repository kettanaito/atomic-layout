import { useState, useEffect } from 'react'
import debounce from '@utils/functions/debounce'
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

  const handleWindowResize = debounce(() => {
    const nextValue = withBreakpoints<T>(breakpoints, defaultValue)
    updateValue(nextValue)
  })

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  })

  return value
}

export default useResponsiveValue
