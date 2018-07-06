import Layout from '../../Layout'
import getAreasList from '../getAreasList'
import getAreaBreakpoints from './'

test('Mobile first', () => {
  const { templates } = getAreasList({
    template: `'a b'`,
    templateLg: `'a'`,
  })

  const areaBreakpoints = getAreaBreakpoints('a', templates)
  expect(areaBreakpoints).toEqual([
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

  const areaBreakpoints = getAreaBreakpoints('b', templates)

  expect(areaBreakpoints).toEqual([
    null,
    {
      behavior: 'down',
      minWidth: Layout.getBreakpoint('md').minWidth,
      maxWidth: Layout.getBreakpoint('xl').minWidth,
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

  const areaBreakpoints = getAreaBreakpoints('b', templates)
  expect(areaBreakpoints).toEqual([
    {
      behavior: 'down',
      minWidth: breakpointXs.minWidth,
      maxWidth: breakpointMd.minWidth,
    },
    null,
    {
      behavior: 'up',
      minWidth: breakpointXl.minWidth,
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
      templateMdDown: `'a c'`,
    })

    /* Area "a" */
    const areaBreakpointsA = getAreaBreakpoints('a', templates)
    expect(areaBreakpointsA).toEqual([
      {
        behavior: 'down',
        minWidth: undefined,
        // maxWidth: breakpointSm.minWidth, // was "breakpointXs.maxWidth"
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
    const areaBreakpointsC = getAreaBreakpoints('c', templates)
    expect(areaBreakpointsC).toEqual([
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
      templateMd: `'a c'`,
    })

    /* Area "a" */
    const areaBreakpointsA = getAreaBreakpoints('a', templates)
    expect(areaBreakpointsA).toEqual([
      {
        behavior: 'down',
        maxWidth: Layout.getBreakpoint('xs').maxWidth,
      },
      {
        behavior: 'up',
        minWidth: Layout.getBreakpoint('md').minWidth,
        maxWidth: undefined,
      },
    ])

    /* Area "c" */
    const areaBreakpointsC = getAreaBreakpoints('c', templates)
    expect(areaBreakpointsC).toEqual([
      null,
      {
        behavior: 'up',
        minWidth: Layout.getBreakpoint('md').minWidth,
        maxWidth: undefined,
      },
    ])
  })
})
