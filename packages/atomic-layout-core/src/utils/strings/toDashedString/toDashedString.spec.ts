import toDashedString from './toDashedString'

describe('toDashedString', () => {
  describe('given a cammelCase string', () => {
    it('should convert the string to kebab-case', () => {
      expect(toDashedString('loremIpsum')).toBe('lorem-ipsum')
      expect(toDashedString('loremIpsumDolor')).toBe('lorem-ipsum-dolor')
    })
  })

  describe('given a string without a capital letter', () => {
    it('should return the string as-is', () => {
      expect(toDashedString('lorem')).toBe('lorem')
    })
  })
})
