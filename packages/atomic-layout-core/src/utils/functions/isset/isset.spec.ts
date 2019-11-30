import isset from './isset'

describe('isset', () => {
  describe('given a set variable', () => {
    it('should return true', () => {
      expect(isset(0)).toBe(true)
      expect(isset('')).toBe(true)
      expect(isset('a')).toBe(true)
      expect(isset([])).toBe(true)
      expect(isset({})).toBe(true)
      expect(isset(() => 'foo')).toBe(true)
    })
  })

  describe('given null', () => {
    it('should return false', () => {
      expect(isset(null)).toBe(false)
    })
  })

  describe('given undefined', () => {
    it('should return false', () => {
      expect(isset(undefined)).toBe(false)
    })
  })
})
