import toLowerCaseFirst from './toLowerCaseFirst'

describe('toLowerCaseFirst', () => {
  it('converts first letter to lowercase', () => {
    expect(toLowerCaseFirst('Foo')).toBe('foo')
    expect(toLowerCaseFirst('FooBar')).toBe('fooBar')
  })

  it('bypasses strings with first lowercase letter', () => {
    expect(toLowerCaseFirst('foo')).toBe('foo')
    expect(toLowerCaseFirst('fooBar')).toBe('fooBar')
  })
})
