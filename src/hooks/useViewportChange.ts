import { useEffect } from 'react'
import debounce from '@utils/functions/debounce'

/**
 * Executes a callback on viewport change (window resize).
 * Callback calls are debounced by default.
 */
const useViewportChange = (
  callback: () => void,
  debounceDuration: number = 50,
) => {
  const handleWindowResize = debounce(callback, debounceDuration)

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
}

export default useViewportChange
