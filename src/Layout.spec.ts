import defaultOptions from './const/defaultOptions'
import Layout from './Layout'

const createConsoleSpy = () => jest.spyOn(console, 'error')

const resetLayoutOptions = () => {
  Layout.isConfigureCalled = false
  Layout.configure(defaultOptions, false)
}

afterEach(() => {
  /* Prevent "Layout.configure()" to affect unrelated test cases */
  resetLayoutOptions()
})

/* Error handling */
test('configure: Forbids calling Layout.configure() without options', () => {
  const consoleError = createConsoleSpy()

  Layout.configure(null as any)
  expect(consoleError).toBeCalled()
})

test('configure: Forbids setting default breakpoint name for non-existing breakpoint', () => {
  const consoleError = createConsoleSpy()

  Layout.configure({
    defaultBreakpointName: 'foo',
  })

  expect(consoleError).toBeCalled()
})

/* API */
test('Propagates default options properly', () => {
  expect(Layout).toHaveProperty('options', defaultOptions)
})

test('Layout has "configure" method', () => {
  expect(Layout).toHaveProperty('configure')
  expect(Layout.configure).toBeInstanceOf(Function)

  Layout.configure({
    defaultUnit: 'rem',
  })

  expect(Layout.options).toHaveProperty('defaultUnit', 'rem')
})

test('getBreakpointNames: Returns "undefined" when Layout has no breakpoints', () => {
  const func = () =>
    Layout.configure({
      breakpoints: undefined,
    })

  expect(func).toThrow()
})

test('getBreakpointNames:Returns breakpoint names for default breakpoints', () => {
  expect(Layout.getBreakpointNames()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
})

test('getBreakpointNames:Returns breakpoint names for custom breakpoints', () => {
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

  expect(Layout.getBreakpointNames()).toEqual(['mobile', 'tablet', 'desktop'])
})

test('getBreakpoint: Returns existing breakpoint info', () => {
  expect(Layout.getBreakpoint('md')).toEqual(defaultOptions.breakpoints.md)
})

test('getBreakpoint: Returns "undefined" for non-existing breakpoint', () => {
  expect(Layout.getBreakpoint('foo')).toBeUndefined()
})

test('Returns "undefined" when no breakpoint name specified', () => {
  expect(Layout.getBreakpoint('non-existing')).toBeUndefined()
})
