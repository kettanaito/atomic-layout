import hashString from './hashString'

describe('hasString', () => {
  it('returns hash from string', () => {
    const input = 'template:header,content,footer'
    expect(hashString(input)).toBe(1927731245)
    expect(hashString(input)).toBe(1927731245)
    expect(hashString('templateMd:header,content,footer')).toBe(1323128868)
  })

  it('returns zero for an empty string', () => {
    expect(hashString('')).toBe(0)
  })
})
