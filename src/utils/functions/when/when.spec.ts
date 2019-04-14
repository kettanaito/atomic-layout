import when from './when'

describe('when', () => {
  const predicate = (num: number) => num > 5
  const call = when(predicate, () => 'foo')

  test('calls function only when predicate resolves', () => {
    expect(call(8)).toBe('foo')
  })

  test('returns input as-is when predicate rejects', () => {
    expect(call(3)).toBe(3)
  })
})
