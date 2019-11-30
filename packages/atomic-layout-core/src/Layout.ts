import defaultOptions, {
  LayoutOptions,
  Breakpoints,
  MeasurementUnit,
  BreakpointBehavior,
} from './const/defaultOptions'
import invariant from './utils/functions/invariant'
import warn from './utils/functions/warn'

class Layout {
  public defaultUnit: MeasurementUnit = defaultOptions.defaultUnit
  public defaultBehavior: BreakpointBehavior = defaultOptions.defaultBehavior
  public breakpoints: Breakpoints = defaultOptions.breakpoints
  public defaultBreakpointName: string = defaultOptions.defaultBreakpointName
  protected isConfigureCalled: boolean = false

  constructor(options?: Partial<LayoutOptions>) {
    return options ? this.configure(options, false) : this
  }

  /**
   * Applies global layout options.
   * Make sure to call this method once, preferably on the rool level
   * of your application.
   */
  public configure(options: Partial<LayoutOptions>, warnOnMultiple = true) {
    if (warnOnMultiple) {
      warn(
        !this.isConfigureCalled,
        'Failed to configure Layout: do not call `Layout.configure()` more than once. Layout configuration must remain consistent throughout the application.',
      )
    }

    invariant(
      options && typeof options === 'object',
      `Failed to configure Layout: expected an options Object, but got: ${options}.`,
    )

    Object.keys(options || {}).forEach((optionName: keyof LayoutOptions) => {
      ;(this[optionName] as any) = options[optionName]
    })

    invariant(
      this.breakpoints,
      'Failed to configure Layout: expected to have at least one breakpoint specified, but got none.',
    )

    invariant(
      this.breakpoints.hasOwnProperty(this.defaultBreakpointName),
      `Failed to configure Layout: cannot use "${this.defaultBreakpointName}" as the default breakpoint (breakpoint not found).`,
    )

    invariant(
      this.defaultBreakpointName,
      `Failed to configure Layout: expected "defaultBreakpointName" property set, but got: ${this.defaultBreakpointName}.`,
    )

    // Mark configure method as called to prevent its multiple calls
    this.isConfigureCalled = warnOnMultiple

    return this
  }
}

export default new Layout()
