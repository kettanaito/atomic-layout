import Layout from '@src/Layout'
import { Breakpoints } from '@src/const/defaultOptions'
import createMediaQuery from '@utils/styles/createMediaQuery'
import useViewportChange from './useViewportChange'

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

    if (prevBreakpointName !== nextBreakpointName) {
      callback(nextBreakpointName)
      prevBreakpointName = nextBreakpointName
    }
  })
}

export default useBreakpointChange
