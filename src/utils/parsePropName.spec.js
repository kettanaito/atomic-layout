import { expect } from 'chai'
import Layout from '../Layout'
import parsePropName from './parsePropName'

test('Parses a prop name without breakpoint or behavior', () => {
  const res = parsePropName('gutter')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', undefined)
  expect(res).to.have.property('behavior', 'up')
})

test('Parses a prop name with a breakpoint', () => {
  const res = parsePropName('gutterMd')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', 'md')
  expect(res).to.have.property('behavior', 'up')
})

test('Parses a prop name with a breakpoint and behavior', () => {
  const res = parsePropName('gutterLgOnly')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', 'lg')
  expect(res).to.have.property('behavior', 'only')
})

test('Ignores unknown strings', () => {
  const res = parsePropName('gutterFoo')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutterFoo')
  expect(res).to.have.property('breakpointName', undefined)
  expect(res).to.have.property('behavior', 'up')
})

test('Returns a prop name and behavior without breakpoint', () => {
  const res = parsePropName('gutterDown')
  expect(res).to.be.an('object')
  expect(res).to.have.property('purePropName', 'gutter')
  expect(res).to.have.property('breakpointName', undefined)
  expect(res).to.have.property('behavior', 'down')
})

test('Parses a prop name with custom breakpoint name', () => {
  Layout.configure({
    breakpoints: {
      mobile: {},
      tablet: {},
      desktop: {},
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

  expect(parsePropName('gutterDesktop')).to.have.property(
    'purePropName',
    'gutter',
  )
  expect(parsePropName('gutterDesktop')).to.have.property(
    'breakpointName',
    'desktop',
  )

  expect(parsePropName('gutterFoo')).to.have.property(
    'purePropName',
    'gutterFoo',
  )
  expect(parsePropName('gutterFoo')).to.have.property(
    'breakpointName',
    undefined,
  )
})
