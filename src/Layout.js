// @flow
import type {
  LayoutOptions,
  MeasurementUnit,
  Breakpoint,
  Breakpoints,
  BreakpointBehavior,
} from './const/defaultOptions'
import defaultOptions from './const/defaultOptions'
import invariant from './utils/invariant'

class Layout {
  defaultUnit: MeasurementUnit
  breakpoints: Breakpoints
  defaultBreakpointName: Breakpoint
  defaultBehavior: BreakpointBehavior

  // TODO
  // Improve options type to have params of Maybe type.
  // This way you don't need to provide the entire config.
  constructor(options: LayoutOptions) {
    return this.configure(options)
  }

  /**
   * Applies global layout options.
   */
  configure(options: LayoutOptions) {
    invariant(
      options,
      `Failed to configure Layout: expected an options Object, but got: ${options}`,
    )

    const nextOptions: LayoutOptions = Object.assign(
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
      nextOptions.breakpoints,
      'Failed to configure Layout: expected to have at least one breakpoint specified, but got none.',
    )

    invariant(
      nextOptions.breakpoints.hasOwnProperty(defaultBreakpointName),
      `Failed to configure Layout: cannot set default breakpoint to "${defaultBreakpointName}" (breakpoint not found).`,
    )

    Object.keys(nextOptions).forEach((optionName) => {
      this[optionName] = nextOptions[optionName]
    })

    return this
  }

  /**
   * Returns the collection of breakpoint names.
   */
  getBreakpointNames(): string[] {
    return Object.keys(this.breakpoints)
  }

  /**
   * Returns breakpoint options by the breakpoint's name.
   */
  getBreakpoint(breakpointName: ?string): ?Breakpoint {
    if (breakpointName) {
      return breakpointName && this.breakpoints[breakpointName]
    }
  }
}

export default new Layout(defaultOptions)
