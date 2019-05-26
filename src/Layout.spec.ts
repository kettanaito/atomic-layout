import defaultOptions from './const/defaultOptions'
import Layout from './Layout'

const resetLayoutOptions = () => {
  Layout.configure(defaultOptions, false)
}

describe('Layout', () => {
  afterEach(() => {
    // Prevent "Layout.configure()" calls to affect unrelated tests
    resetLayoutOptions()
  })

  it('does not throw on initial require', () => {
    // @ts-ignore
    const run = () => require('./Layout')
    expect(run).not.toThrow()
  })

  it('instantiates with default options', () => {
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
    const publicApi = ['configure', 'getBreakpoint', 'getBreakpointNames']

    publicApi.forEach((propName) => {
      it(propName, () => {
        expect(Layout).toHaveProperty(propName)
      })
    })
  })

  describe('configure()', () => {
    describe('when called with invalid options', () => {
      const invalidOptions = [null, undefined]

      invalidOptions.forEach((layoutOption) => {
        describe(`when called with ${layoutOption}`, () => {
          const run = () => Layout.configure(layoutOption as any)

          it('produces one error', () => {
            expect(run).toThrowError(
              `Failed to configure Layout: expected an options Object, but got: ${layoutOption}`,
            )
          })
        })
      })
    })

    describe('defaultBreakpointName', () => {
      describe('with existing breakpoint name as value', () => {
        const run = () =>
          Layout.configure({
            defaultBreakpointName: 'sm',
          })

        it('produces no errors', () => {
          expect(run).not.toThrow()
        })

        it('sets given breakpoint as default', () => {
          run()
          expect(Layout.defaultBreakpointName).toBe('sm')
        })
      })

      describe('given non-string value', () => {
        const invalidValues = [3, [], {}]

        invalidValues.forEach((value) => {
          describe(`given ${typeof value}`, () => {
            it('produces one error', () => {
              const run = () =>
                Layout.configure({
                  defaultBreakpointName: value as any,
                })

              expect(run).toThrowError(
                `Failed to configure Layout: cannot use "${value}" as the default breakpoint (breakpoint not found).`,
              )
            })
          })
        })
      })

      describe('with non-existing breakpoint name as value', () => {
        const values = [null, undefined, 'foo']

        values.forEach((value) => {
          describe(`when given "${value}"`, () => {
            const run = () => {
              Layout.configure({
                defaultBreakpointName: value,
              })
            }

            it('produces one error', () => {
              expect(run).toThrowError(
                `Failed to configure Layout: cannot use "${value}" as the default breakpoint (breakpoint not found).`,
              )
            })
          })
        })
      })
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
      const run = () =>
        Layout.configure({
          breakpoints: undefined,
        })

      expect(run).toThrowError(
        'Failed to configure Layout: expected to have at least one breakpoint specified, but got none.',
      )
    })
  })

  describe('getBreakpoint()', () => {
    describe('with default breakpoints', () => {
      it('returns existing breakpoint data', () => {
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
          defaultBreakpointName: 'retina',
          breakpoints: {
            retina: {
              minResolution: '300dpi',
            },
          },
        })
      })

      it('returns existing breakpoint data', () => {
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
