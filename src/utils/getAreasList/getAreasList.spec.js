import { expect } from 'chai'
import Layout from '../../Layout'
import getAreasList from './getAreasList'

test('Parses template props properly', () => {
  const areasList = getAreasList({
    foo: 'bar',
    template: `a b`,
  })

  expect(areasList).to.deep.equal({
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

test('Returns proper areas list for "behavior:up"', () => {
  const areasList = getAreasList({
    template: `a b`,
    templateMd: `a b c`,
  })

  expect(areasList).to.deep.equal({
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

test('Returns proper areas list for "behavior:down"', () => {
  const areasList = getAreasList({
    template: `a b`,
    templateMdDown: `c`,
  })

  expect(areasList).to.deep.equal({
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

test('Returns proper areas list for "behavior:only"', () => {
  const areasList = getAreasList({
    template: `a`,
    templateMdOnly: `b c`,
  })

  expect(areasList).to.deep.equal({
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
