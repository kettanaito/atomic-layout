import { Layout, Breakpoints, createMediaQuery } from '@atomic-layout/core'
import useViewportChange from './useViewportChange'

/**
 * Executes a given callback upon any breakpoint change.
 * Callback calls are throttled by default.
 */
const useBreakpointChange = (
  callback: (breakpointName: string) => void,
  throttleInterval?: number,
  breakpoints: Breakpoints = Layout.breakpoints,
) => {
  let prevBreakpointName: string

  useViewportChange(() => {
    const nextBreakpointName = Object.keys(breakpoints).find(
      (breakpointName) => {
        const mediaQuery = createMediaQuery(breakpoints[breakpointName], 'only')
        return matchMedia(mediaQuery).matches
      },
    )

    // Executes the callback only when breakpoint name has changed
    // between viewport changes.
    if (prevBreakpointName !== nextBreakpointName) {
      callback(nextBreakpointName)
      prevBreakpointName = nextBreakpointName
    }
  }, throttleInterval)
}

export default useBreakpointChange
