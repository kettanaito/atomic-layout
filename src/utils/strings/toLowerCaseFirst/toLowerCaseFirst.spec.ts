import toLowerCaseFirst from './toLowerCaseFirst'

describe('toLowerCaseFirst', () => {
  describe('given a capitalized string', () => {
    it('should convert the first letter to lowercase', () => {
      expect(toLowerCaseFirst('Foo')).toBe('foo')
      expect(toLowerCaseFirst('FooBar')).toBe('fooBar')
    })
  })

  describe('given a string with first latter already being lowercase', () => {
    it('should return the string as-is', () => {
      expect(toLowerCaseFirst('foo')).toBe('foo')
      expect(toLowerCaseFirst('fooBar')).toBe('fooBar')
    })
  })
})
