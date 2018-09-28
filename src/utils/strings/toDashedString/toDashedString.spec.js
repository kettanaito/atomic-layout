import toDashedString from './toDashedString'

test('Converts cammelCase to dashed-string', () => {
  expect(toDashedString('loremIpsumDolor')).toBe('lorem-ipsum-dolor')
  expect(toDashedString('LoremIpsumDolor')).toBe('lorem-ipsum-dolor')
})

test('Bypasses strings without capital letter', () => {
  expect(toDashedString('lorem')).toBe('lorem')
})
