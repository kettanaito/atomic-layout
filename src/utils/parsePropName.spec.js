import { expect } from 'chai'
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
