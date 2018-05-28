/**
 * Default breakpoints based on Bootstrap grid.
 */
const breakpoints = [
  {
    name: 'xs',
    to: 575,
  },
  {
    name: 'sm',
    from: 576,
    to: 768,
  },
  {
    name: 'md',
    from: 769,
    to: 992,
  },
  {
    name: 'lg',
    from: 993,
    to: 1199,
  },
  {
    name: 'xl',
    from: 1200,
  },
]

export const getBreakpointsNames = () =>
  breakpoints.map((breakpoint) => breakpoint.name)

export const getBreakpointFor = (mediaQuery) => {
  return breakpoints.find((breakpoint) => breakpoint.name === mediaQuery)
}

export default breakpoints
