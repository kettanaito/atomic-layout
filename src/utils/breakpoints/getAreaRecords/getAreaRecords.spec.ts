import Layout from '../../../Layout'
import transformNumeric from '../../math/transformNumeric'
import getAreasList from '../../templates/getAreasList'
import getAreaRecords, { AreaRecord } from './getAreaRecords'

describe('getAreaRecords', () => {
  describe('given compatible breakpoints', () => {
    describe('and the area is present in all templates ([X, X])', () => {
      const { templates } = getAreasList({
        template: ['a', 'b'],
        templateLg: ['a'],
      })
      let areaRecords: AreaRecord[]

      beforeAll(() => {
        areaRecords = getAreaRecords('a', templates)
      })

      it('should return one area record', () => {
        expect(areaRecords).toHaveLength(1)
      })

      it('should have "up" behavior', () => {
        expect(areaRecords[0]).toHaveProperty('behavior', 'up')
      })

      it('should have an empty breakpoint', () => {
        expect(areaRecords[0]).toHaveProperty('breakpoint', {
          minWidth: undefined,
          maxWidth: undefined,
        })
      })
    })

    describe('and the area is present in the middle template ([_, X, _])', () => {
      const breakpointMd = Layout.breakpoints.md || {}
      const breakpointXl = Layout.breakpoints.xl || {}
      const { templates } = getAreasList({
        template: ['a'],
        templateMd: ['a', 'b'],
        templateXl: ['a'],
      })
      let areaRecords: AreaRecord[]

      beforeAll(() => {
        areaRecords = getAreaRecords('b', templates)
      })

      it('should return three area records', () => {
        expect(areaRecords).toHaveLength(3)
      })

      it('should not render on the first template', () => {
        expect(areaRecords[0]).toBeNull()
      })

      describe('should render on the second template', () => {
        it('should have "down" behavior', () => {
          expect(areaRecords[1]).toHaveProperty('behavior', 'down')
        })

        it('should have a breakpoint "minWidth" equal to "minWidth" of preceding template', () => {
          expect(areaRecords[1]).toHaveProperty(
            ['breakpoint', 'minWidth'],
            breakpointMd.minWidth,
          )
        })

        it('should have a breakpoint "maxWidth" equal to "minWidth - 1" of the following template', () => {
          expect(areaRecords[1]).toHaveProperty(
            ['breakpoint', 'maxWidth'],
            `calc(${transformNumeric(breakpointXl.minWidth)} - 1px)`,
          )
        })
      })

      it('should not render on the third template', () => {
        expect(areaRecords[2]).toBeNull()
      })
    })

    describe('and the area is present on the ends of the templates ([X, _, X])', () => {
      const breakpointXs = Layout.breakpoints.xs || {}
      const breakpointMd = Layout.breakpoints.md || {}
      const breakpointXl = Layout.breakpoints.xl || {}
      const { templates } = getAreasList({
        template: ['a', 'b'],
        templateMd: ['a'],
        templateXl: ['a', 'b'],
      })
      let areaRecords: AreaRecord[]

      beforeAll(() => {
        areaRecords = getAreaRecords('b', templates)
      })

      it('should return three area records', () => {
        expect(areaRecords).toHaveLength(3)
      })

      describe('should render on the first template', () => {
        it('should have "down" behavior', () => {
          expect(areaRecords[0]).toHaveProperty('behavior', 'down')
        })

        it('should have a breakpoint "minWidth" equal to "minWidth" of the preceding template', () => {
          expect(areaRecords[0]).toHaveProperty(
            ['breakpoint', 'minWidth'],
            breakpointXs.minWidth,
          )
        })

        it('should have a breakpoint "maxWidth" to equal "minWidth - 1" of the current template', () => {
          expect(areaRecords[0]).toHaveProperty(
            ['breakpoint', 'maxWidth'],
            `calc(${transformNumeric(breakpointMd.minWidth)} - 1px)`,
          )
        })
      })

      it('should not render on the second tempate', () => {
        expect(areaRecords[1]).toBeNull()
      })

      describe('should render on the third template', () => {
        it('should have "up" behavior', () => {
          expect(areaRecords[2]).toHaveProperty('behavior', 'up')
        })

        it('should have a breakpoint "minWidth" equal to "minWidth" of third template', () => {
          expect(areaRecords[2]).toHaveProperty(
            ['breakpoint', 'minWidth'],
            breakpointXl.minWidth,
          )
        })

        it('should have an open breakpoint', () => {
          expect(areaRecords[2]).toHaveProperty(
            ['breakpoint', 'maxWidth'],
            undefined,
          )
        })
      })
    })
  })

  describe('given incompatible breakpoints', () => {
    describe('and the area is present in all templates ([X, Y])', () => {
      let areaRecords: AreaRecord[]

      beforeAll(() => {
        areaRecords = getAreaRecords('first', [
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
        ])
      })

      it('should return two area records', () => {
        expect(areaRecords).toHaveLength(2)
      })

      describe('should render on the first template', () => {
        it('should have "up" behavior', () => {
          expect(areaRecords[0]).toHaveProperty('behavior', 'up')
        })

        it('should not have any "minHeight"', () => {
          expect(areaRecords[0]).toHaveProperty(
            ['breakpoint', 'minHeight'],
            undefined,
          )
        })

        it('should have a breakpoint "maxHeight" equal to "maxWidth" of the first template', () => {
          expect(areaRecords[0]).toHaveProperty(
            ['breakpoint', 'maxHeight'],
            500,
          )
        })
      })

      describe('should render on the second template', () => {
        it('should have "up" behavior', () => {
          expect(areaRecords[1]).toHaveProperty('behavior', 'up')
        })

        it('should have a breakpoint "minResolution" equal to such dimension of the second template', () => {
          expect(areaRecords[1]).toHaveProperty(
            ['breakpoint', 'minResolution'],
            '200dpi',
          )
        })

        it('should have an open breakpoint', () => {
          expect(areaRecords[1]).toHaveProperty(
            ['breakpoints', 'maxResolution'],
            undefined,
          )
        })
      })
    })

    describe('and the area is present on the ends of the templates ([X, _, Y]', () => {
      let areaRecords: AreaRecord[]

      beforeAll(() => {
        areaRecords = getAreaRecords('first', [
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
        ])
      })

      it('should have three area records', () => {
        expect(areaRecords).toHaveLength(3)
      })

      describe('should render on the first template', () => {
        it('should have "down" behavior', () => {
          expect(areaRecords[0]).toHaveProperty('behavior', 'down')
        })

        it('should have no "minHeight"', () => {
          expect(areaRecords[0]).toHaveProperty(
            ['breakpoint', 'minHeight'],
            undefined,
          )
        })

        it('should stretch breakpoint up to the closest template with the area', () => {
          expect(areaRecords[0]).toHaveProperty(
            ['breakpoint', 'maxHeight'],
            'calc(650px - 1px)',
          )
        })
      })

      it('should not render on the second template', () => {
        expect(areaRecords[1]).toBeNull()
      })

      describe('should render on the third template', () => {
        it('should have "up" behavior', () => {
          expect(areaRecords[2]).toHaveProperty('behavior', 'up')
        })

        it('should have a breakpoint "minResolution" equal to such dimension of the third template', () => {
          expect(areaRecords[2]).toHaveProperty(
            ['breakpoint', 'minResolution'],
            '200dpi',
          )
        })

        it('should have an open breakpoint', () => {
          expect(areaRecords[2]).toHaveProperty(
            ['breakpoint', 'maxResolution'],
            undefined,
          )
        })
      })
    })
  })

  describe('given combined scenarios', () => {
    it('should concatenate sibling areas with "down" behavior', () => {
      const breakpointSm = Layout.breakpoints.sm || {}
      const breakpointMd = Layout.breakpoints.md || {}

      const { templates } = getAreasList({
        template: ['a'],
        templateSmDown: ['c'],
        templateMdDown: ['a', 'c'],
      })

      /* Area "a" */
      const areaBreakpointsA = getAreaRecords('a', templates)
      expect(areaBreakpointsA).toEqual([
        {
          behavior: 'down',
          breakpoint: {
            minWidth: undefined,
            maxWidth: `calc(${transformNumeric(breakpointSm.minWidth)} - 1px)`,
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
      const areaBreakpointsC = getAreaRecords('c', templates)
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

    it('having notch with explicit "down" area behavior', () => {
      const breakpointXs = Layout.breakpoints.xs || {}
      const breakpointMd = Layout.breakpoints.md || {}

      const { templates } = getAreasList({
        templateDown: ['a'],
        templateMd: ['a', 'c'],
      })

      /* Area "a" */
      const areaBreakpointsA = getAreaRecords('a', templates)
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
      const areaBreakpointsC = getAreaRecords('c', templates)
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
