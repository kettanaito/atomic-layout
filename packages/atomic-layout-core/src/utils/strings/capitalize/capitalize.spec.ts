import capitalize from './capitalize'

describe('capitalize', () => {
  describe('given an arbitrary string', () => {
    it('should capitalize the given string', () => {
      expect(capitalize('foo')).toBe('Foo')
    })
  })

  describe('given already capitalized string', () => {
    it('should return the string as-is', () => {
      expect(capitalize('Foo')).toBe('Foo')
    })
  })

  describe('given a string with in-string capital letters', () => {
    let result: string

    beforeAll(() => {
      result = capitalize('fooBarDoe')
    })

    it('should capitalize the string', () => {
      expect(result).toMatch(/^F/)
    })

    it('should preserve existing capital letters', () => {
      expect(result).toBe('FooBarDoe')
    })
  })
})
