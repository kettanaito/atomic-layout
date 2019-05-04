import defaultOptions from './const/defaultOptions'
import Layout from './Layout'

const createConsoleSpy = () => jest.spyOn(console, 'error')

const resetLayoutOptions = () => {
  Layout.configure(defaultOptions, false)
}

describe('Layout', () => {
  afterEach(() => {
    /* Prevent "Layout.configure()" to affect unrelated test cases */
    resetLayoutOptions()
  })

  it('instantiated with default options', () => {
    expect(Layout).toHaveProperty('defaultUnit', defaultOptions.defaultUnit)
    expect(Layout).toHaveProperty(
      'defaultBehavior',
      defaultOptions.defaultBehavior,
    )
    expect(Layout).toHaveProperty(
      'defaultBreakpointName',
      defaultOptions.defaultBreakpointName,
    )
    expect(Layout).toHaveProperty('breakpoints', defaultOptions.breakpoints)
  })

  describe('exports public API', () => {
    ;['configure', 'getBreakpoint', 'getBreakpointNames'].forEach(
      (apiMethod) => {
        it(apiMethod, () => {
          expect(Layout).toHaveProperty(apiMethod)
          expect(Layout[apiMethod]).toBeInstanceOf(Function)
        })
      },
    )
  })

  describe('configure()', () => {
    it('cannot call Layout.configure() without options', () => {
      const consoleError = createConsoleSpy()

      Layout.configure(null as any)
      expect(consoleError).toBeCalledTimes(1)

      consoleError.mockRestore()
    })

    it('cannot set default breakpoint name to non-existing breakpoint', () => {
      const consoleError = createConsoleSpy()

      Layout.configure({
        defaultBreakpointName: 'foo',
      })

      expect(consoleError).toBeCalledTimes(1)
      consoleError.mockRestore()
    })

    it('cannot set default breakpoint to a non-string value', () => {
      const consoleError = createConsoleSpy()

      Layout.configure({
        defaultBreakpointName: 2 as any,
        breakpoints: { 2: {} },
      })

      expect(consoleError).toBeCalledTimes(1)
      consoleError.mockRestore()
    })
  })

  describe('getBreakpointNames()', () => {
    describe('with default breakpoints', () => {
      it('returns list of breakpoint names', () => {
        expect(Layout.getBreakpointNames()).toEqual([
          'xs',
          'sm',
          'md',
          'lg',
          'xl',
        ])
      })
    })

    describe('with custom breakpoints', () => {
      beforeEach(() => {
        Layout.configure({
          defaultBreakpointName: 'mobile',
          breakpoints: {
            mobile: {
              maxWidth: 768,
            },
            tablet: {
              minWidth: 769,
              maxWidth: 1099,
            },
            desktop: {
              minWidth: 1100,
            },
          },
        })
      })

      afterAll(resetLayoutOptions)

      it('returns list of custom breakpoint names', () => {
        expect(Layout.getBreakpointNames()).toEqual([
          'mobile',
          'tablet',
          'desktop',
        ])
      })
    })

    it('throws when Layout has no breakpoints', () => {
      const func = () =>
        Layout.configure({
          breakpoints: undefined,
        })

      expect(func).toThrow()
    })
  })

  describe('getBreakpoint()', () => {
    describe('with default breakpoints', () => {
      it('returns info for existing breakpoint', () => {
        expect(Layout.getBreakpoint('md')).toEqual(
          defaultOptions.breakpoints.md,
        )
      })

      it('returns "undefined" for not found breakpoint', () => {
        expect(Layout.getBreakpoint('non-existing')).toBeUndefined()
      })
    })

    describe('with custom breakpoints', () => {
      beforeEach(() => {
        Layout.configure({
          breakpoints: {
            retina: { minResolution: '300dpi' },
          },
        })
      })

      afterAll(resetLayoutOptions)

      it('returns info for existing breakpoint', () => {
        expect(Layout.getBreakpoint('retina')).toEqual({
          minResolution: '300dpi',
        })
      })

      it('returns "undefined" for not found breakpoint', () => {
        expect(Layout.getBreakpoint('md')).toBeUndefined()
      })
    })
  })
})
