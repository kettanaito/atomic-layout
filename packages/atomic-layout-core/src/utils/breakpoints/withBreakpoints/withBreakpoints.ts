import Layout from '../../../Layout'
import { Breakpoints } from '../../../const/defaultOptions'
import createMediaQuery from '../../styles/createMediaQuery'

const createWithBreakpoints = (breakpoints: Breakpoints) => {
  const existingBreakpoints = Object.keys(breakpoints)

  return <T>(breakpointsMap: Record<string, T>, defaultValue?: T): T => {
    const breakpointMatch = Object.keys(breakpointsMap)
      .filter((breakpointName) => {
        const hasBreakpoint = existingBreakpoints.includes(breakpointName)

        if (!hasBreakpoint) {
          console.warn(
            'useBreakpoints: Breakpoint "%s" is not found. Add it via "Layout.configure()", or use one of the existing breakpoints (%s).',
            breakpointName,
            existingBreakpoints.join(', '),
          )
        }

        return hasBreakpoint
      })
      .find((breakpointName) => {
        const breakpoint: Breakpoints | undefined = breakpoints[breakpointName]
        const mediaQuery = createMediaQuery(breakpoint, 'only')
        return breakpoint && matchMedia(mediaQuery).matches
      })

    return breakpointMatch ? breakpointsMap[breakpointMatch] : defaultValue
  }
}

const withBreakpoints = createWithBreakpoints(Layout.breakpoints)

export default withBreakpoints
