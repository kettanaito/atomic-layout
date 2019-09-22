import hashString from './hashString'

describe('hashString', () => {
  describe('given a string with an arbitrary value', () => {
    it('should return a hash based on the given string', () => {
      const input = 'template:header,content,footer'

      expect(hashString(input)).toBe(1927731245)
      expect(hashString(input)).toBe(1927731245)
      expect(hashString('templateMd:header,content,footer')).toBe(1323128868)
    })
  })

  describe('given an empty string', () => {
    it('should return explicit 0', () => {
      expect(hashString('')).toBe(0)
    })
  })
})
