import getPrefix from './getPrefix'

test('Returns the min/max prefix of the given string', () => {
  expect(getPrefix('maxHeight')).toEqual('max')
  expect(getPrefix('minResolution')).toEqual('min')
})

test('Bypasses unknown prefixes', () => {
  expect(getPrefix('fooBar')).toEqual(null)
  expect(getPrefix('abcDef')).toEqual(null)
})
