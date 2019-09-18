import Layout from '../../../Layout'
import transformNumeric from '../../math/transformNumeric'
import getAreasList from '../../templates/getAreasList'
import getAreaBreakpoints from './getAreaRecords'

describe('getAreaBreakpoints', () => {
  describe('with compatible breakpoints', () => {
    it('always renders area present in all templates', () => {
      const { templates } = getAreasList({
        template: ['a', 'b'],
        templateLg: ['a'],
      })

      const areaBreakpoints = getAreaBreakpoints('a', templates)
      expect(areaBreakpoints).toEqual([
        {
          behavior: 'up',
          breakpoint: {
            minWidth: undefined,
            maxWidth: undefined,
          },
        },
      ])
    })

    it('renders inclusive area conditionally', () => {
      const breakpointMd = Layout.breakpoints.md || {}
      const breakpointXl = Layout.breakpoints.xl || {}

      const { templates } = getAreasList({
        template: ['a'],
        templateMd: ['a', 'b'],
        templateXl: ['a'],
      })

      const areaBreakpoints = getAreaBreakpoints('b', templates)

      expect(areaBreakpoints).toEqual([
        null,
        {
          behavior: 'down',
          breakpoint: {
            minWidth: breakpointMd.minWidth,
            maxWidth: `calc(${transformNumeric(breakpointXl.minWidth)} - 1px)`,
          },
        },
        null,
      ])
    })

    it('renders notch area conditionally', () => {
      const breakpointXs = Layout.breakpoints.xs || {}
      const breakpointMd = Layout.breakpoints.md || {}
      const breakpointXl = Layout.breakpoints.xl || {}

      const { templates } = getAreasList({
        template: ['a', 'b'],
        templateMd: ['a'],
        templateXl: ['a', 'b'],
      })

      const areaBreakpoints = getAreaBreakpoints('b', templates)
      expect(areaBreakpoints).toEqual([
        {
          behavior: 'down',
          breakpoint: {
            minWidth: breakpointXs.minWidth,
            maxWidth: `calc(${transformNumeric(breakpointMd.minWidth)} - 1px)`,
          },
        },
        null,
        {
          behavior: 'up',
          breakpoint: {
            minWidth: breakpointXl.minWidth,
          },
        },
      ])
    })

    describe('Shuffled behavior', () => {
      it('concatenates sibling areas with "down" behavior', () => {
        const breakpointSm = Layout.breakpoints.sm || {}
        const breakpointMd = Layout.breakpoints.md || {}

        const { templates } = getAreasList({
          template: ['a'],
          templateSmDown: ['c'],
          templateMdDown: ['a', 'c'],
        })

        /* Area "a" */
        const areaBreakpointsA = getAreaBreakpoints('a', templates)
        expect(areaBreakpointsA).toEqual([
          {
            behavior: 'down',
            breakpoint: {
              minWidth: undefined,
              maxWidth: `calc(${transformNumeric(
                breakpointSm.minWidth,
              )} - 1px)`,
            },
          },
          null,
          {
            behavior: 'down',
            breakpoint: {
              minWidth: breakpointMd.minWidth,
              maxWidth: breakpointMd.maxWidth,
            },
          },
        ])

        /* Area "c" */
        const areaBreakpointsC = getAreaBreakpoints('c', templates)
        expect(areaBreakpointsC).toEqual([
          null,
          {
            behavior: 'down',
            breakpoint: {
              minWidth: breakpointSm.minWidth,
              maxWidth: breakpointMd.maxWidth,
            },
          },
        ])
      })

      it('notch behavior using explicit "down" area behavior', () => {
        const breakpointXs = Layout.breakpoints.xs || {}
        const breakpointMd = Layout.breakpoints.md || {}

        const { templates } = getAreasList({
          templateDown: ['a'],
          templateMd: ['a', 'c'],
        })

        /* Area "a" */
        const areaBreakpointsA = getAreaBreakpoints('a', templates)
        expect(areaBreakpointsA).toEqual([
          {
            behavior: 'down',
            breakpoint: {
              maxWidth: breakpointXs.maxWidth,
            },
          },
          {
            behavior: 'up',
            breakpoint: {
              minWidth: breakpointMd.minWidth,
              maxWidth: undefined,
            },
          },
        ])

        /* Area "c" */
        const areaBreakpointsC = getAreaBreakpoints('c', templates)
        expect(areaBreakpointsC).toEqual([
          null,
          {
            behavior: 'up',
            breakpoint: {
              minWidth: breakpointMd.minWidth,
              maxWidth: undefined,
            },
          },
        ])
      })
    })
  })

  describe('with incompatible breakpoints', () => {
    it('returns proper areas', () => {
      expect(
        getAreaBreakpoints('first', [
          {
            areas: ['first'],
            behavior: 'up',
            breakpoint: {
              maxHeight: 500,
            },
          },
          {
            areas: ['first', 'second'],
            behavior: 'up',
            breakpoint: {
              minResolution: '200dpi',
            },
          },
        ]),
      ).toEqual([
        {
          behavior: 'up',
          breakpoint: {
            minHeight: undefined,
            maxHeight: 500,
          },
        },
        {
          behavior: 'up',
          breakpoint: {
            minResolution: '200dpi',
            maxResolution: undefined,
          },
        },
      ])
    })

    it('uses "calc()" to stretch breakpoints', () => {
      expect(
        getAreaBreakpoints('first', [
          {
            areas: ['first'],
            behavior: 'up',
            breakpoint: {
              maxHeight: 500,
            },
          },
          {
            areas: ['second'],
            behavior: 'up',
            breakpoint: {
              minHeight: 650,
              maxHeight: 750,
            },
          },
          {
            areas: ['first', 'second'],
            behavior: 'up',
            breakpoint: {
              minResolution: '200dpi',
            },
          },
        ]),
      ).toEqual([
        {
          behavior: 'down',
          breakpoint: {
            maxHeight: 'calc(650px - 1px)',
          },
        },
        null,
        {
          behavior: 'up',
          breakpoint: {
            minResolution: '200dpi',
          },
        },
      ])
    })
  })
})
