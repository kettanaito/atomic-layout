// @flow
import type {
  TLayoutOptions,
  TBreakpoint,
  TBreakpoints,
} from './const/defaultOptions'
import defaultOptions from './const/defaultOptions'

class Layout {
  defaultUnit: string
  breakpoints: TBreakpoints

  // TODO
  // Improve options type to have params of Maybe type.
  // This way you don't need to provide the entire config.
  constructor(options: TLayoutOptions) {
    return this.configure(options)
  }

  /**
   * Applies global layout options.
   */
  configure(options: TLayoutOptions) {
    const nextOptions: TLayoutOptions = Object.assign(
      {},
      defaultOptions,
      options,
    )

    Object.keys(nextOptions).forEach((optionName) => {
      this[optionName] = nextOptions[optionName]
    })

    return this
  }

  /**
   * Returns the collection of breakpoint names.
   */
  getBreakpointsNames(): string[] {
    return Object.keys(this.breakpoints)
  }

  /**
   * Returns breakpoint options by the breakpoint's name.
   */
  getBreakpoint(breakpointName: ?string): ?TBreakpoint {
    if (breakpointName) {
      return this.breakpoints[breakpointName]
    }
  }
}

export default new Layout(defaultOptions)
