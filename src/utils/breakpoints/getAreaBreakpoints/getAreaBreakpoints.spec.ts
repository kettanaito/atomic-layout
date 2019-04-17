import Layout from '../../../Layout'
import getAreasList from '../../templates/getAreasList'
import getAreaBreakpoints from './getAreaBreakpoints'

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
          minWidth: undefined,
          maxWidth: undefined,
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
          minWidth: breakpointMd.minWidth,
          maxWidth: `calc(${Layout.transformNumeric(
            breakpointXl.minWidth,
          )} - 1px)`,
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
          minWidth: breakpointXs.minWidth,
          maxWidth: `calc(${Layout.transformNumeric(
            breakpointMd.minWidth,
          )} - 1px)`,
        },
        null,
        {
          behavior: 'up',
          minWidth: breakpointXl.minWidth,
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
            minWidth: undefined,
            maxWidth: `calc(${Layout.transformNumeric(
              breakpointSm.minWidth,
            )} - 1px)`,
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
            maxWidth: breakpointXs.maxWidth,
          },
          {
            behavior: 'up',
            minWidth: breakpointMd.minWidth,
            maxWidth: undefined,
          },
        ])

        /* Area "c" */
        const areaBreakpointsC = getAreaBreakpoints('c', templates)
        expect(areaBreakpointsC).toEqual([
          null,
          {
            behavior: 'up',
            minWidth: breakpointMd.minWidth,
            maxWidth: undefined,
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
          minHeight: undefined,
          maxHeight: 500,
        },
        {
          behavior: 'up',
          minResolution: '200dpi',
          maxResolution: undefined,
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
          maxHeight: 'calc(650px - 1px)',
        },
        null,
        {
          behavior: 'up',
          minResolution: '200dpi',
        },
      ])
    })
  })
})
