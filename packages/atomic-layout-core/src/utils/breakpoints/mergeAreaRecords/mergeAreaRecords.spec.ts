import mergeAreaRecords from './mergeAreaRecords'

describe('mergeAreaRecords', () => {
  describe('given two breakpoints going up', () => {
    describe('and the area is included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 500,
            maxWidth: 765,
          },
        },
        true,
      )

      it('should have "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('should have "minWidth" from the lower breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 500)
      })

      it('should have "maxWidth" from the higher breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('and the area is not included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 500,
            maxWidth: 765,
          },
        },
        false,
      )

      it('should have "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('should have "minWidth" from the lower breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 500)
      })

      it('should calculate "maxWidth" from the highest "minWidth"', () => {
        expect(breakpoint).toHaveProperty(
          ['breakpoint', 'maxWidth'],
          'calc(768px - 1px)',
        )
      })
    })
  })

  describe('given two breakpoints going down', () => {
    describe('and the area is included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'down',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'down',
          breakpoint: {
            maxWidth: 767,
          },
        },
        true,
      )

      it('should have "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('should have "minWidth" from the lowest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], undefined)
      })

      it('should have "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('and the area is not included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'down',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'down',
          breakpoint: {
            minWidth: 500,
            maxWidth: 767,
          },
        },
        false,
      )

      it('should have "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('should have "minWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('should have "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })
  })

  describe('given two bell breakpoints', () => {
    describe('and the area is included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'down',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'up',
          breakpoint: {
            maxWidth: 767,
          },
        },
        true,
      )

      it('should have "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('should not have any "minWidth"', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], undefined)
      })

      it('should have "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('and the area is not included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'down',
          breakpoint: {
            maxWidth: 767,
          },
        },
        false,
      )

      it('should have "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('should have "minWidth" from the lowest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('should have "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })
  })

  describe('given two notch breakpoints', () => {
    describe('and the area is included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'down',
          breakpoint: {
            maxWidth: 767,
          },
        },
        true,
      )

      it('should have "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('should have "minWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('should have "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('and the area is not included', () => {
      const breakpoint = mergeAreaRecords(
        {
          behavior: 'up',
          breakpoint: {
            minWidth: 768,
            maxWidth: 960,
          },
        },
        {
          behavior: 'down',
          breakpoint: {
            maxWidth: 767,
          },
        },
        false,
      )

      it('should have "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('should have "minWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('should have "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })
  })
})
