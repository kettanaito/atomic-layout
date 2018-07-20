import { expect } from 'chai'
import defaultOptions from './const/defaultOptions'
import Layout from './Layout'

test('Sets default options properly', () => {
  expect(Layout).to.have.property('defaultUnit', defaultOptions.defaultUnit)
  expect(Layout).to.have.property('breakpoints', defaultOptions.breakpoints)
})

test('Sets custom options properly', () => {
  expect(Layout)
    .to.have.property('configure')
    .to.be.a('function')

  Layout.configure({
    defaultUnit: 'rem',
  })

  expect(Layout).to.have.property('defaultUnit', 'rem')
})

test('Returns breakpoints names', () => {
  expect(Layout.getBreakpointsNames()).to.deep.equal([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
  ])
})

test('Returns existing breakpoint info', () => {
  expect(Layout.getBreakpoint('md')).to.deep.equal(
    defaultOptions.breakpoints.md,
  )
})

test('Returns "undefined" for non-existing breakpoint', () => {
  expect(Layout.getBreakpoint('foo')).to.equal(undefined)
})

test('Returns "undefined" when no breakpoint specified', () => {
  expect(Layout.getBreakpoint()).to.equal(undefined)
})
