import isAreaName from './isAreaName'

describe('isAreaName', () => {
  describe('given a valid string value', () => {
    it('should return true', () => {
      expect(isAreaName('footer')).toBe(true)
    })
  })

  describe('given a numeric value', () => {
    it('should return false', () => {
      expect(isAreaName('100px')).toBe(false)
      expect(isAreaName('2fr')).toBe(false)
    })
  })

  describe('given a reserved keyword', () => {
    it('should return false', () => {
      expect(isAreaName('/')).toBe(false)
      expect(isAreaName('auto')).toBe(false)
    })
  })

  describe('given a dot placeholder', () => {
    describe('given a single dot character', () => {
      it('should return false', () => {
        expect(isAreaName('.')).toBe(false)
      })
    })

    describe('given a sequence of dots', () => {
      it('should return false', () => {
        expect(isAreaName('..')).toBe(false)
        expect(isAreaName('....')).toBe(false)
        expect(isAreaName('.......')).toBe(false)
      })
    })
  })
})
