import { expect }   from 'chai'
import Layout       from '../../Layout'
import getAreasList from './getAreasList'

test('Parses template props properly', () => {
  const list = getAreasList({
    unknownProp: false,
    template: `a b`,
    templateMd: `a b c`,
  })

  expect(list).to.deep.equal({
    areas: ['a', 'b', 'c'],
    templates: [
      {
        areas: ['a', 'b'],
        breakpoint: Layout.getBreakpoint('xs'),
        behavior: 'up',
      },
      {
        areas: ['a', 'b', 'c'],
        breakpoint: Layout.getBreakpoint('md'),
        behavior: 'up',
      },
    ],
  })
})
