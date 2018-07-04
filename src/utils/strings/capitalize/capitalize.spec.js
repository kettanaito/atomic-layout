import capitalize from './'

test('Capitalizes the given string', () => {
  expect(capitalize('foo')).toBe('Foo')
  expect(capitalize('fooSome')).toBe('FooSome')
})
