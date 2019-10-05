import { useEffect, useRef } from 'react'
import throttle from '@utils/functions/throttle'

/**
 * Executes a callback on viewport change (window resize).
 * Callback calls are throttled by default.
 */
const useViewportChange = (
  callback: () => void,
  throttleInterval: number = 70,
) => {
  const handleWindowResize = useRef<(...args: any[]) => any>()

  useEffect(() => {
    handleWindowResize.current = throttle(callback, throttleInterval)
  })

  useEffect(() => {
    handleWindowResize.current()
    window.addEventListener('resize', handleWindowResize.current)
    return () =>
      window.removeEventListener('resize', handleWindowResize.current)
  }, [])
}

export default useViewportChange
