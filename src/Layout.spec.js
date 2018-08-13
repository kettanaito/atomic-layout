import defaultOptions from './const/defaultOptions'
import Layout from './Layout'

const resetLayoutOptions = () => {
  Layout.configure(defaultOptions)
}

afterEach(() => {
  /* Prevent "Layout.configure()" to affect unrelated test cases */
  resetLayoutOptions()
})

/* Error handling */
test('configure: Forbids calling Layout.configure() without options', () => {
  expect(Layout.configure).toThrow()
})

test('configure: Forbids setting default breakpoint name for non-existing breakpoint', () => {
  expect(
    Layout.configure.bind(this, {
      defaultBreakpointName: 'foo',
    }),
  ).toThrow()
})

/* API */
test('Propagates default options properly', () => {
  expect(Layout).toHaveProperty('defaultUnit', defaultOptions.defaultUnit)
  expect(Layout).toHaveProperty('breakpoints', defaultOptions.breakpoints)
})

test('configure: Sets custom options properly', () => {
  expect(Layout).toHaveProperty('configure')

  Layout.configure({
    defaultUnit: 'rem',
  })

  expect(Layout).toHaveProperty('defaultUnit', 'rem')
})

test('getBreakpointNames: Returns "undefined" when Layout has no breakpoints', () => {
  expect(
    Layout.configure.bind(this, {
      breakpoints: null,
    }),
  ).toThrow()
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
  expect(Layout.getBreakpoint()).toBeUndefined()
})
