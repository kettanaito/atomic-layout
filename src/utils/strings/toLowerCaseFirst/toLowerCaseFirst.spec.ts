import toLowerCaseFirst from './toLowerCaseFirst'

test('Transforms first letter to lowercase', () => {
  expect(toLowerCaseFirst('Foo')).toBe('foo')
  expect(toLowerCaseFirst('FooBar')).toBe('fooBar')
})
