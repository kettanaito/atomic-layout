// @flow
import type {
  TLayoutOptions,
  TMeasurementUnit,
  TBreakpoint,
  TBreakpoints,
  TBreakpointBehavior,
} from './const/defaultOptions'
import defaultOptions from './const/defaultOptions'
import invariant from './utils/invariant'

class Layout {
  defaultUnit: TMeasurementUnit
  breakpoints: TBreakpoints
  defaultBreakpointName: TBreakpoint
  defaultBehavior: TBreakpointBehavior

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

    const { defaultBreakpointName } = nextOptions
    invariant(
      defaultBreakpointName,
      `Failed to configure Layout: expected "defaultBreakpointName" property set, but got: ${defaultBreakpointName}`,
    )

    invariant(
      nextOptions.breakpoints[defaultBreakpointName],
      `Failed to configure Layout: cannot find a breakpoint with the name "${defaultBreakpointName}" (default breakpoint).`,
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
      return breakpointName && this.breakpoints[breakpointName]
    }
  }
}

export default new Layout(defaultOptions)
