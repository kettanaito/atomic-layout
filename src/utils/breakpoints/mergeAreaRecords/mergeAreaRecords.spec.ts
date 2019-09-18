import mergeAreaRecords from './mergeAreaRecords'

describe('mergeAreaRecords', () => {
  describe('with two breakpoints going up', () => {
    describe('when includes area', () => {
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

      it('has "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('has "minWidth" from the lower breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 500)
      })

      it('has "maxWidth" from the higher breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('when does not include area', () => {
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

      it('has "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('has "minWidth" from the lower breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 500)
      })

      it('calculates "maxWidth" from the highest "minWidth"', () => {
        expect(breakpoint).toHaveProperty(
          ['breakpoint', 'maxWidth'],
          'calc(768px - 1px)',
        )
      })
    })
  })

  describe('with two breakpoints going down', () => {
    describe('when includes the area', () => {
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

      it('has "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('has "minWidth" from the lowest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], undefined)
      })

      it('has "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('when does not include the area', () => {
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

      it('has "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('has "minWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('has "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })
  })

  describe('with two bell breakpoints', () => {
    describe('when includes the area', () => {
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

      it('has "down" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'down')
      })

      it('has no "minWidth"', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], undefined)
      })

      it('has "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('when does not include the area', () => {
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

      it('has "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('has "minWidth" from the lowest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('has "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })
  })

  describe('with two notch breakpoints', () => {
    describe('when includes the area', () => {
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

      it('has "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('has "minWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('has "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })

    describe('when does not include the area', () => {
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

      it('has "up" behavior', () => {
        expect(breakpoint).toHaveProperty('behavior', 'up')
      })

      it('has "minWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'minWidth'], 768)
      })

      it('has "maxWidth" from the highest breakpoint', () => {
        expect(breakpoint).toHaveProperty(['breakpoint', 'maxWidth'], 960)
      })
    })
  })
})
