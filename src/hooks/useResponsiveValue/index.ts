import { useState, useEffect } from 'react'
import withBreakpoints from './withBreakpoints'

const useResponsiveValue = <T>(
  breakpoints: Record<string, T>,
  defaultValue?: T,
): T => {
  const [value, updateValue] = useState<T>(defaultValue)

  const handleWindowResize = () => {
    const nextValue = withBreakpoints<T>(breakpoints, defaultValue)
    updateValue(nextValue)
  }

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  })

  return value
}

export default useResponsiveValue
