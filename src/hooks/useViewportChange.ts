import { useEffect } from 'react'
import throttle from '@utils/functions/throttle'

/**
 * Executes a callback on viewport change (window resize).
 * Callback calls are throttled by default.
 */
const useViewportChange = (
  callback: () => void,
  throttleInterval: number = 70,
) => {
  const handleWindowResize = throttle(callback, throttleInterval)

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
}

export default useViewportChange
