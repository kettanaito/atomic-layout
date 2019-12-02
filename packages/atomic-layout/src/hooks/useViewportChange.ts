import { useEffect, useRef } from 'react'
import { throttle } from '@atomic-layout/core'

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
    const { current } = handleWindowResize

    current()
    window.addEventListener('resize', current)
    return () => window.removeEventListener('resize', current)
  }, [])
}

export default useViewportChange
