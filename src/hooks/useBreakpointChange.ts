import Layout from '@src/Layout'
import { Breakpoints } from '@src/const/defaultOptions'
import createMediaQuery from '@utils/styles/createMediaQuery'
import useViewportChange from './useViewportChange'

/**
 * Executes a given callback upon any breakpoint change.
 * Callback calls are debounced by default.
 */
const useBreakpointChange = (
  callback: (breakpointName: string) => void,
  debounceDuration?: number,
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
  }, debounceDuration)
}

export default useBreakpointChange
