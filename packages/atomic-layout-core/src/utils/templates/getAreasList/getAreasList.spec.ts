import Layout from '../../../Layout'
import filterTemplateProps from '../parseTemplates/filterTemplateProps'
import getAreasList from './getAreasList'

const withProps = filterTemplateProps

describe('getAreasList', () => {
  it('parses template props properly', () => {
    const areasList = getAreasList(
      withProps({
        template: `a b`,
      }),
    )

    expect(areasList).toEqual({
      areas: ['a', 'b'],
      templates: [
        {
          areas: ['a', 'b'],
          behavior: 'up',
          breakpoint: Layout.breakpoints.xs,
        },
      ],
    })
  })

  it('returns proper areas list for "up" behavior', () => {
    const areasList = getAreasList(
      withProps({
        template: `a b`,
        templateMd: `a b c`,
      }),
    )

    expect(areasList).toEqual({
      areas: ['a', 'b', 'c'],
      templates: [
        {
          areas: ['a', 'b'],
          behavior: 'up',
          breakpoint: Layout.breakpoints.xs,
        },
        {
          areas: ['a', 'b', 'c'],
          behavior: 'up',
          breakpoint: Layout.breakpoints.md,
        },
      ],
    })
  })

  it('returns proper areas list for "down" behavior', () => {
    const areasList = getAreasList(
      withProps({
        template: `a b`,
        templateMdDown: `c`,
      }),
    )

    expect(areasList).toEqual({
      areas: ['a', 'b', 'c'],
      templates: [
        {
          areas: ['a', 'b'],
          behavior: 'up',
          breakpoint: Layout.breakpoints.xs,
        },
        {
          areas: ['c'],
          behavior: 'down',
          breakpoint: Layout.breakpoints.md,
        },
      ],
    })
  })

  it('returns proper areas list for "only" behavior', () => {
    const areasList = getAreasList(
      withProps({
        template: `a`,
        templateMdOnly: `b c`,
      }),
    )

    expect(areasList).toEqual({
      areas: ['a', 'b', 'c'],
      templates: [
        {
          areas: ['a'],
          behavior: 'up',
          breakpoint: Layout.breakpoints.xs,
        },
        {
          areas: ['b', 'c'],
          behavior: 'only',
          breakpoint: Layout.breakpoints.md,
        },
      ],
    })
  })
})
