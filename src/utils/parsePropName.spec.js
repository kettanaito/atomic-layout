import { expect } from 'chai'
import Layout from '../Layout'
import parsePropName from './parsePropName'

test('Parses a prop name with a breakpoint and behavior', () => {
  const resOne = parsePropName('gutterLgOnly')
  expect(resOne).to.be.an('object')
  expect(resOne).to.have.property('purePropName', 'gutter')
  expect(resOne).to.have.property('breakpointName', 'lg')
  expect(resOne).to.have.property('behavior', 'only')

  const resTwo = parsePropName('paddingVerticalLgOnly')
  expect(resTwo).to.be.an('object')
  expect(resTwo).to.have.property('purePropName', 'paddingVertical')
  expect(resTwo).to.have.property('breakpointName', 'lg')
  expect(resTwo).to.have.property('behavior', 'only')
})

test('Parses a prop name without breakpoint or behavior', () => {
  const res = parsePropName('gutter')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', 'xs')
  expect(res).to.have.property('behavior', 'up')
})

test('Parses a prop name with breakpoint', () => {
  const res = parsePropName('gutterMd')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', 'md')
  expect(res).to.have.property('behavior', 'up')
})

test('Ignores unknown strings', () => {
  const res = parsePropName('gutterFoo')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutterFoo')
  expect(res).to.have.property('breakpointName', 'xs')
  expect(res).to.have.property('behavior', 'up')
})

test('Returns a prop name and behavior without breakpoint', () => {
  const res = parsePropName('gutterDown')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', 'xs')
  expect(res).to.have.property('behavior', 'down')
})

test('Parses a prop name with custom breakpoint name', () => {
  Layout.configure({
    breakpoints: {
      mobile: {},
      tablet: {},
      desktopRetina: {},
    },
  })

  expect(parsePropName('gutterMobile')).to.have.property(
    'purePropName',
    'gutter',
  )
  expect(parsePropName('gutterMobile')).to.have.property(
    'breakpointName',
    'mobile',
  )

  expect(parsePropName('gutterTablet')).to.have.property(
    'purePropName',
    'gutter',
  )
  expect(parsePropName('gutterTablet')).to.have.property(
    'breakpointName',
    'tablet',
  )

  expect(parsePropName('gutterDesktopRetina')).to.have.property(
    'purePropName',
    'gutter',
  )
  expect(parsePropName('gutterDesktopRetina')).to.have.property(
    'breakpointName',
    'desktopRetina',
  )
  expect(parsePropName('gutterDesktopRetinaDown')).to.have.property(
    'behavior',
    'down',
  )

  expect(parsePropName('gutterFoo')).to.have.property(
    'purePropName',
    'gutterFoo',
  )
  expect(parsePropName('gutterFoo')).to.have.property('breakpointName', 'xs')
})
