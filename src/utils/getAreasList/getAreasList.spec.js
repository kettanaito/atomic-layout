import Layout from '../../Layout'
import getAreasList from './getAreasList'

test('Parses template props properly', () => {
  const areasList = getAreasList({
    template: `a b`,
  })

  expect(areasList).toEqual({
    areas: ['a', 'b'],
    templates: [
      {
        areas: ['a', 'b'],
        behavior: 'up',
        breakpoint: Layout.getBreakpoint('xs'),
      },
    ],
  })
})

test('Returns proper areas list for "up" behavior', () => {
  const areasList = getAreasList({
    template: `a b`,
    templateMd: `a b c`,
  })

  expect(areasList).toEqual({
    areas: ['a', 'b', 'c'],
    templates: [
      {
        areas: ['a', 'b'],
        behavior: 'up',
        breakpoint: Layout.getBreakpoint('xs'),
      },
      {
        areas: ['a', 'b', 'c'],
        behavior: 'up',
        breakpoint: Layout.getBreakpoint('md'),
      },
    ],
  })
})

test('Returns proper areas list for "down" behavior', () => {
  const areasList = getAreasList({
    template: `a b`,
    templateMdDown: `c`,
  })

  expect(areasList).toEqual({
    areas: ['a', 'b', 'c'],
    templates: [
      {
        areas: ['a', 'b'],
        behavior: 'up',
        breakpoint: Layout.getBreakpoint('xs'),
      },
      {
        areas: ['c'],
        behavior: 'down',
        breakpoint: Layout.getBreakpoint('md'),
      },
    ],
  })
})

test('Returns proper areas list for "only" behavior', () => {
  const areasList = getAreasList({
    template: `a`,
    templateMdOnly: `b c`,
  })

  expect(areasList).toEqual({
    areas: ['a', 'b', 'c'],
    templates: [
      {
        areas: ['a'],
        behavior: 'up',
        breakpoint: Layout.getBreakpoint('xs'),
      },
      {
        areas: ['b', 'c'],
        behavior: 'only',
        breakpoint: Layout.getBreakpoint('md'),
      },
    ],
  })
})
