import createMediaQuery from './createMediaQuery'

describe('createMediaQuery', () => {
  describe('given a breakpoint with "up" behavior', () => {
    let mediaQuery: string

    beforeAll(() => {
      mediaQuery = createMediaQuery(
        {
          minWidth: 500,
          maxWidth: 765,
        },
        'up',
      )
    })

    it('should not have any "max-" breakpoint properties', () => {
      expect(mediaQuery).not.toContain('maxWidth')
    })

    it('should return a media query string with "min-" breakpoint properties', () => {
      expect(mediaQuery).toEqual('(min-width:500px)')
    })
  })

  describe('given a breakpoint with "down" behavior', () => {
    let mediaQuery: string

    beforeAll(() => {
      mediaQuery = createMediaQuery(
        {
          minWidth: 400,
          maxWidth: 565,
          minResolution: '300dpi',
        },
        'down',
      )
    })

    it('should not have any "min-" breakpoint properties', () => {
      expect(mediaQuery).not.toContain('minWidth')
    })

    it('should return a media query string with "max-" breakpoint properties', () => {
      expect(mediaQuery).toEqual(
        '(max-width:565px) and (min-resolution:300dpi)',
      )
    })
  })

  describe('given a breakpoint with "only" behavior', () => {
    let mediaQuery: string

    beforeAll(() => {
      mediaQuery = createMediaQuery(
        {
          minWidth: 768,
          maxWidth: 1120,
          orientation: 'landscape',
        },
        'only',
      )
    })

    it('should return a media query string with all breakpoint properties', () => {
      expect(mediaQuery).toContain(
        '(min-width:768px) and (max-width:1120px) and (orientation:landscape)',
      )
    })
  })
})
