import getPrefix from './getPrefix'

describe('getPrefix', () => {
  describe('given a string with supported prefix', () => {
    it('should return the prefix', () => {
      expect(getPrefix('maxHeight')).toBe('max')
      expect(getPrefix('minResolution')).toBe('min')
    })
  })

  describe('given a string with a supported prefix within a string', () => {
    it('should ignore in-string matched and return an empty string', () => {
      expect(getPrefix('aminmaxWidth')).toBe('')
    })
  })

  describe('given an arbitrary string', () => {
    it('should return an empty string', () => {
      expect(getPrefix('fooBar')).toBe('')
      expect(getPrefix('abcDef')).toBe('')
    })
  })
})
