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
    const publicApi = ['configure']

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

  describe('transformNumeric', () => {
    describe('suffixes numeric value with measurement unit', () => {
      it('with default measurement unit', () => {
        expect(Layout.transformNumeric(5)).toBe('5px')
      })

      it('with custom measurement unit', () => {
        Layout.configure({
          defaultUnit: 'rem',
        })

        expect(Layout.transformNumeric(3)).toBe('3rem')
      })
    })

    it('bypasses string value', () => {
      expect(Layout.transformNumeric('2vh')).toBe('2vh')
    })

    it('handles explicit zero as a value and no suffix is attached', () => {
      expect(Layout.transformNumeric('0')).toBe('0')
      expect(Layout.transformNumeric(0)).toBe('0')
    })

    it('returns empty string when no value provided', () => {
      expect(Layout.transformNumeric()).toBe('')
      expect(Layout.transformNumeric('')).toBe('')
    })
  })
})
