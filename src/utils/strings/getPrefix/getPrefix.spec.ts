import getPrefix from './getPrefix'

test('Returns min/max prefix of the given string', () => {
  expect(getPrefix('maxHeight')).toEqual('max')
  expect(getPrefix('minResolution')).toEqual('min')
})

test('Bypasses unknown prefixes', () => {
  expect(getPrefix('fooBar')).toEqual('')
  expect(getPrefix('abcDef')).toEqual('')
})
