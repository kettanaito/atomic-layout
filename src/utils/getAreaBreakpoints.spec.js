import { expect } from 'chai'
import Layout from '../Layout'
import getAreasList from './getAreasList'
import getAreaBreakpoints from './getAreaBreakpoints'

test('Mobile first', () => {
  const { templates } = getAreasList({
    template: `'a b'`,
    templateLg: `'a'`,
  })
  const breakpoints = getAreaBreakpoints('a', templates)

  expect(breakpoints).to.deep.equal([
    {
      behavior: 'up',
      minWidth: undefined,
      maxWidth: undefined,
    },
  ])
})

test('Inclusive', () => {
  const { templates } = getAreasList({
    template: `'a'`,
    templateMd: `'a b'`,
    templateXl: `'a'`,
  })
  const breakpoints = getAreaBreakpoints('b', templates)

  const breakpointMd = Layout.getBreakpoint('md')
  expect(breakpoints).to.deep.equal([
    null,
    {
      behavior: 'up',
      minWidth: breakpointMd.minWidth,
      maxWidth: breakpointMd.maxWidth,
    },
    null,
  ])
})

test('Bell', () => {
  const { templates } = getAreasList({
    template: `'a b'`,
    templateMd: `'a'`,
    templateXl: `'a b'`,
  })
  const breakpoints = getAreaBreakpoints('b', templates)

  const breakpointXs = Layout.getBreakpoint('xs')
  const breakpointXl = Layout.getBreakpoint('xl')
  expect(breakpoints).to.deep.equal([
    {
      behavior: 'up',
      minWidth: breakpointXs.minWidth,
      maxWidth: breakpointXs.maxWidth,
    },
    null,
    {
      behavior: 'up',
      minWidth: breakpointXl.minWidth,
      maxWidth: breakpointXl.maxWidth,
    },
  ])
})
