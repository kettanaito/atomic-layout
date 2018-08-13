import Layout from '../../../Layout'
import parsePropName from './'

test('Parses a prop name with a breakpoint and behavior', () => {
  const resOne = parsePropName('gutterLgOnly')
  expect(resOne).toBeInstanceOf(Object)
  expect(resOne).toHaveProperty('purePropName', 'gutter')
  expect(resOne).toHaveProperty('breakpointName', 'lg')
  expect(resOne).toHaveProperty('behavior', 'only')

  const resTwo = parsePropName('paddingVerticalLgOnly')
  expect(resTwo).toBeInstanceOf(Object)
  expect(resTwo).toHaveProperty('purePropName', 'paddingVertical')
  expect(resTwo).toHaveProperty('breakpointName', 'lg')
  expect(resTwo).toHaveProperty('behavior', 'only')
})

test('Parses a prop name without breakpoint or behavior', () => {
  const res = parsePropName('gutter')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutter')
  expect(res).toHaveProperty('breakpointName', 'xs')
  expect(res).toHaveProperty('behavior', 'up')
})

test('Parses a prop name with breakpoint', () => {
  const res = parsePropName('gutterMd')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutter')
  expect(res).toHaveProperty('breakpointName', 'md')
  expect(res).toHaveProperty('behavior', 'up')
})

test('Ignores unknown strings', () => {
  const res = parsePropName('gutterFoo')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutterFoo')
  expect(res).toHaveProperty('breakpointName', 'xs')
  expect(res).toHaveProperty('behavior', 'up')
})

test('Returns a prop name and behavior without breakpoint', () => {
  const res = parsePropName('gutterDown')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutter')
  expect(res).toHaveProperty('breakpointName', 'xs')
  expect(res).toHaveProperty('behavior', 'down')
})

test('Parses a prop name with custom breakpoint name', () => {
  Layout.configure({
    defaultBreakpointName: 'mobile',
    breakpoints: {
      mobile: {},
      tablet: {},
      desktopRetina: {},
    },
  })

  expect(parsePropName('gutterMobile')).toHaveProperty('purePropName', 'gutter')
  expect(parsePropName('gutterMobile')).toHaveProperty(
    'breakpointName',
    'mobile',
  )

  expect(parsePropName('gutterTablet')).toHaveProperty('purePropName', 'gutter')
  expect(parsePropName('gutterTablet')).toHaveProperty(
    'breakpointName',
    'tablet',
  )

  expect(parsePropName('gutterDesktopRetina')).toHaveProperty(
    'purePropName',
    'gutter',
  )
  expect(parsePropName('gutterDesktopRetina')).toHaveProperty(
    'breakpointName',
    'desktopRetina',
  )
  expect(parsePropName('gutterDesktopRetinaDown')).toHaveProperty(
    'behavior',
    'down',
  )

  expect(parsePropName('gutterFoo')).toHaveProperty('purePropName', 'gutterFoo')
  expect(parsePropName('gutterFoo')).toHaveProperty('breakpointName', 'mobile')
})
