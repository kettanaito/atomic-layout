import isAreaName from './isAreaName'

describe('isAreaName', () => {
  describe('returns true', () => {
    it('when given area name', () => {
      expect(isAreaName('footer')).toBe(true)
    })
  })

  describe('returns false', () => {
    it('when given numeric value', () => {
      expect(isAreaName('100px')).toBe(false)
      expect(isAreaName('2fr')).toBe(false)
    })

    it('when given dimensional keyword', () => {
      expect(isAreaName('auto')).toBe(false)
    })
  })
})
