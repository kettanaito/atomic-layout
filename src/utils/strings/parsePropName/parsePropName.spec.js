import { Layout } from '../../../Layout'
import defaultOptions from '../../../const/defaultOptions'
import parsePropName from './'

const defaultLayout = new Layout(defaultOptions)
const defaultParse = parsePropName(defaultLayout)

test('Parses a prop name with a breakpoint and behavior', () => {
  const resOne = defaultParse('gutterLgOnly')
  expect(resOne).toBeInstanceOf(Object)
  expect(resOne).toHaveProperty('purePropName', 'gutter')
  expect(resOne).toHaveProperty('breakpointName', 'lg')
  expect(resOne).toHaveProperty('behavior', 'only')

  const resTwo = defaultParse('paddingVerticalLgOnly')
  expect(resTwo).toBeInstanceOf(Object)
  expect(resTwo).toHaveProperty('purePropName', 'paddingVertical')
  expect(resTwo).toHaveProperty('breakpointName', 'lg')
  expect(resTwo).toHaveProperty('behavior', 'only')
})

test('Parses a prop name without breakpoint or behavior', () => {
  const res = defaultParse('gutter')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutter')
  expect(res).toHaveProperty('breakpointName', 'xs')
  expect(res).toHaveProperty('behavior', 'up')
})

test('Parses a prop name with breakpoint', () => {
  const res = defaultParse('gutterMd')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutter')
  expect(res).toHaveProperty('breakpointName', 'md')
  expect(res).toHaveProperty('behavior', 'up')
})

test('Ignores unknown strings', () => {
  const res = defaultParse('gutterFoo')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutterFoo')
  expect(res).toHaveProperty('breakpointName', 'xs')
  expect(res).toHaveProperty('behavior', 'up')
})

test('Returns a prop name and behavior without breakpoint', () => {
  const res = defaultParse('gutterDown')
  expect(res).toBeInstanceOf(Object)
  expect(res).toHaveProperty('purePropName', 'gutter')
  expect(res).toHaveProperty('breakpointName', 'xs')
  expect(res).toHaveProperty('behavior', 'down')
})

test('Parses a prop name with custom breakpoint name', () => {
  const customLayout = new Layout({
    defaultBreakpointName: 'mobile',
    breakpoints: {
      mobile: {},
      tablet: {},
      desktopRetina: {},
    },
  })
  const customParse = parsePropName(customLayout)

  expect(customParse('gutterMobile')).toHaveProperty('purePropName', 'gutter')
  expect(customParse('gutterMobile')).toHaveProperty('breakpointName', 'mobile')

  expect(customParse('gutterTablet')).toHaveProperty('purePropName', 'gutter')
  expect(customParse('gutterTablet')).toHaveProperty('breakpointName', 'tablet')

  expect(customParse('gutterDesktopRetina')).toHaveProperty(
    'purePropName',
    'gutter',
  )
  expect(customParse('gutterDesktopRetina')).toHaveProperty(
    'breakpointName',
    'desktopRetina',
  )
  expect(customParse('gutterDesktopRetinaDown')).toHaveProperty(
    'behavior',
    'down',
  )

  expect(customParse('gutterFoo')).toHaveProperty('purePropName', 'gutterFoo')
  expect(customParse('gutterFoo')).toHaveProperty('breakpointName', 'mobile')
})
