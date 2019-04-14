import getPrefix from './getPrefix'

describe('getPrefix', () => {
  it('returns matching prefix', () => {
    expect(getPrefix('maxHeight')).toEqual('max')
    expect(getPrefix('minResolution')).toEqual('min')
  })

  it('ignores in-string matches', () => {
    expect(getPrefix('aminmaxWidth')).toEqual('')
  })

  it('returns empty string upon no match', () => {
    expect(getPrefix('fooBar')).toEqual('')
    expect(getPrefix('abcDef')).toEqual('')
  })
})
