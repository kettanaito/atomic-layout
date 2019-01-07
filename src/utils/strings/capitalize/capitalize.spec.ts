import capitalize from './capitalize'

test('Capitalizes the given string', () => {
  expect(capitalize('foo')).toBe('Foo')
  expect(capitalize('fooSome')).toBe('FooSome')
})
