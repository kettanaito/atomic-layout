import normalizeQuery from './normalizeQuery'

describe('normalizeQuery', () => {
  describe('given a media query Object', () => {
    it('returns its [key, value] pairs', () => {
      expect(
        normalizeQuery({
          minWidth: 120,
          maxAspectRatio: '3/4',
        }),
      ).toEqual([['min-width', 120], ['max-aspect-ratio', '3/4']])
    })
  })
})
