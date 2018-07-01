import { expect } from 'chai'
import Layout from '../../Layout'
import getAreasList from '../getAreasList'
import getAreaParams from './getAreaParams'

test('Mobile first', () => {
  const { templates } = getAreasList({
    template: `'a b'`,
    templateLg: `'a'`,
  })

  const areaParams = getAreaParams('a', templates)
  expect(areaParams).to.deep.equal([
    {
      behavior: 'up',
      minWidth: undefined,
      maxWidth: undefined,
    },
  ])
})

test('Inclusive', () => {
  const breakpointMd = Layout.getBreakpoint('md')
  const breakpointXl = Layout.getBreakpoint('xl')

  const { templates } = getAreasList({
    template: `'a'`,
    templateMd: `'a b'`,
    templateXl: `'a'`,
  })

  const areaParams = getAreaParams('b', templates)
  expect(areaParams).to.deep.equal([
    null,
    {
      behavior: 'down',
      minWidth: breakpointMd.minWidth,
      maxWidth: breakpointXl.minWidth - 1,
    },
    null,
  ])
})

test('Bell', () => {
  const breakpointXs = Layout.getBreakpoint('xs')
  const breakpointMd = Layout.getBreakpoint('md')
  const breakpointXl = Layout.getBreakpoint('xl')

  const { templates } = getAreasList({
    template: `'a b'`,
    templateMd: `'a'`,
    templateXl: `'a b'`,
  })

  const areaParams = getAreaParams('b', templates)
  expect(areaParams).to.deep.equal([
    {
      behavior: 'down',
      minWidth: breakpointXs.minWidth,
      maxWidth: breakpointMd.minWidth - 1,
    },
    null,
    {
      behavior: 'up',
      minWidth: breakpointXl.minWidth,
      maxWidth: breakpointXl.maxWidth,
    },
  ])
})

describe('Shuffled behavior', () => {
  test('Concatenates sibling areas with "down" behavior', () => {
    const breakpointXs = Layout.getBreakpoint('xs')
    const breakpointSm = Layout.getBreakpoint('sm')
    const breakpointMd = Layout.getBreakpoint('md')

    const { templates } = getAreasList({
      template: `'a'`,
      templateSmDown: `'c'`,
      templateMdDown: 'a c',
    })

    /* Area "a" */
    const areaParamsA = getAreaParams('a', templates)
    expect(areaParamsA).to.deep.equal([
      {
        behavior: 'down',
        minWidth: undefined,
        maxWidth: breakpointXs.maxWidth,
      },
      null,
      {
        behavior: 'down',
        minWidth: breakpointMd.minWidth,
        maxWidth: breakpointMd.maxWidth,
      },
    ])

    /* Area "c" */
    const areaParamsC = getAreaParams('c', templates)
    expect(areaParamsC).to.deep.equal([
      null,
      {
        behavior: 'down',
        minWidth: breakpointSm.minWidth,
        maxWidth: breakpointMd.maxWidth,
      },
    ])
  })

  test('Bell behavior using explicit "down" area behavior', () => {
    const { templates } = getAreasList({
      templateDown: `'a'`,
      templateMd: 'a c',
    })

    /* Area "a" */
    const areaParamsA = getAreaParams('a', templates)
    expect(areaParamsA).to.deep.equal([
      {
        behavior: 'down',
        minWidth: undefined,
        maxWidth: Layout.getBreakpoint('xs').maxWidth,
      },
      {
        behavior: 'up',
        minWidth: Layout.getBreakpoint('md').minWidth,
        maxWidth: undefined,
      },
    ])

    /* Area "c" */
    const areaParamsC = getAreaParams('c', templates)
    expect(areaParamsC).to.deep.equal([
      null,
      {
        behavior: 'up',
        minWidth: Layout.getBreakpoint('md').minWidth,
        maxWidth: undefined,
      },
    ])
  })
})
