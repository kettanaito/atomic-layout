// @flow
import type { TBreakpoint } from './const/defaultOptions'
import defaultOptions from './const/defaultOptions'

interface ILayoutOptions {
  defaultUnit: string;
  breakpoints: TBreakpoint[];
}

class Layout implements ILayoutOptions {
  defaultUnit: string
  breakpoints: TBreakpoint[]

  constructor(options: ILayoutOptions) {
    return this.configure(options)
  }

  configure(options: ILayoutOptions) {
    const nextOptions: ILayoutOptions = Object.assign(
      {},
      defaultOptions,
      options,
    )

    this.defaultUnit = nextOptions.defaultUnit
    this.breakpoints = nextOptions.breakpoints

    return this
  }

  getBreakpointsNames(): string[] {
    return this.breakpoints.map((breakpoint) => breakpoint.name)
  }

  getBreakpoint(breakpointName: string): ?TBreakpoint {
    return this.breakpoints.find(
      (breakpoint) => breakpoint.name == breakpointName,
    )
  }
}

export default new Layout(defaultOptions)
