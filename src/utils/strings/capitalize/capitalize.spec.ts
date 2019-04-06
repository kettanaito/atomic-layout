import capitalize from './capitalize'

test('Capitalizes the given string', () => {
  expect(capitalize('foo')).toBe('Foo')
  expect(capitalize('fooSome')).toBe('FooSome')
})

test('Returns already capitalized string as-is', () => {
  expect(capitalize('Foo')).toBe('Foo')
  expect(capitalize('FooSome')).toBe('FooSome')
})
