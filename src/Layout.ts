import defaultOptions, {
  LayoutOptions,
  Breakpoint,
} from './const/defaultOptions'
import invariant from './utils/invariant'

class Layout {
  public options: LayoutOptions = defaultOptions

  /* Internal */
  private isConfigureCalled: boolean = false

  // TODO
  // Improve options type to have params of Maybe type.
  // This way you don't need to provide the entire config.
  constructor(options: LayoutOptions) {
    return this.configure(options, false)
  }

  /**
   * Applies global layout options.
   */
  public configure(options: Partial<LayoutOptions>, warnOnMultiple = true) {
    if (warnOnMultiple) {
      invariant(
        !this.isConfigureCalled,
        'Failed to configure Layout: do not call `Layout.configure()` more than once. Layout configuration must remain consistent throughout the application.',
      )
    }

    invariant(
      options && typeof options === 'object',
      `Failed to configure Layout: expected an options Object, but got: ${options}`,
    )

    const allOptions: LayoutOptions = {
      ...defaultOptions,
      ...options,
    }

    const { defaultBreakpointName } = allOptions
    invariant(
      defaultBreakpointName && typeof defaultBreakpointName === 'string',
      `Failed to configure Layout: expected "defaultBreakpointName" property set, but got: ${defaultBreakpointName}`,
    )

    invariant(
      allOptions.breakpoints,
      'Failed to configure Layout: expected to have at least one breakpoint specified, but got none.',
    )

    invariant(
      allOptions.breakpoints.hasOwnProperty(defaultBreakpointName),
      `Failed to configure Layout: cannot use "${defaultBreakpointName}" as the default breakpoint (breakpoint not found).`,
    )

    this.options = allOptions

    /* Mark configure method as called to prevent multiple calls */
    this.isConfigureCalled = warnOnMultiple

    return this
  }

  /**
   * Returns the collection of breakpoint names present
   * in the current layout configuration.
   */
  public getBreakpointNames(): string[] {
    return Object.keys(this.options.breakpoints)
  }

  /**
   * Returns breakpoint options by the given breakpoint name.
   */
  public getBreakpoint(breakpointName: string): Breakpoint | null {
    if (breakpointName) {
      return this.options.breakpoints[breakpointName]
    }

    return null
  }
}

export default new Layout(defaultOptions)
