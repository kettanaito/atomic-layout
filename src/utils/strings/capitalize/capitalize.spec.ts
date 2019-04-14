import capitalize from './capitalize'

describe('capitalize', () => {
  it('capitalizes the given string', () => {
    expect(capitalize('foo')).toBe('Foo')
  })

  it('bypasses already capitalized string', () => {
    expect(capitalize('Foo')).toBe('Foo')
  })

  it('preserves existing capital letters', () => {
    expect(capitalize('fooBarDoe')).toBe('FooBarDoe')
  })
})
