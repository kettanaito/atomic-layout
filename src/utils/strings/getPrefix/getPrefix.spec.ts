import getPrefix from './getPrefix'

describe('getPrefix', () => {
  it('returns matching prefix', () => {
    expect(getPrefix('maxHeight')).toBe('max')
    expect(getPrefix('minResolution')).toBe('min')
  })

  it('ignores in-string matches', () => {
    expect(getPrefix('aminmaxWidth')).toBe('')
  })

  it('returns empty string upon no match', () => {
    expect(getPrefix('fooBar')).toBe('')
    expect(getPrefix('abcDef')).toBe('')
  })
})
