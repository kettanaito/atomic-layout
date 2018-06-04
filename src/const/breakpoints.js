// @flow
export type TBehavior = 'up' | 'down' | 'only'

export type TBreakpoint = {
  name: string,
  from?: number,
  to?: number,
}

/**
 * Default breakpoints based on Bootstrap grid.
 */
const breakpoints: TBreakpoint[] = [
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

/**
 * Returns the collection of the present breakpoint names.
 */
export const getBreakpointsNames = () =>
  breakpoints.map((breakpoint) => breakpoint.name)

/**
 * Returns the options for the given breakpoint name.
 */
export const getBreakpoint = (breakpointName: string): ?TBreakpoint => {
  return breakpoints.find((breakpoint) => breakpoint.name === breakpointName)
}

export default breakpoints
