import { useState, useEffect } from 'react'
import withBreakpoints from './withBreakpoints'
import debounce from '@utils/functions/debounce'

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
