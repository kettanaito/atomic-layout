import toDashedString from './toDashedString'

describe('toDashedString', () => {
  it('ronverts cammelCase to dashed-string', () => {
    expect(toDashedString('loremIpsum')).toBe('lorem-ipsum')
    expect(toDashedString('loremIpsumDolor')).toBe('lorem-ipsum-dolor')
  })

  it('bypasses strings without capital letter', () => {
    expect(toDashedString('lorem')).toBe('lorem')
  })
})
