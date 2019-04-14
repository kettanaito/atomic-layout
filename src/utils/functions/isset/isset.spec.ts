import isset from './isset'

describe('isset', () => {
  test('returns "true" when a variable is set', () => {
    expect(isset(0)).toBe(true)
    expect(isset('')).toBe(true)
    expect(isset('a')).toBe(true)
    expect(isset([])).toBe(true)
    expect(isset({})).toBe(true)
    expect(isset(() => 'foo')).toBe(true)
  })

  test('returns "false" when a variable is not set', () => {
    expect(isset(null)).toBe(false)
    expect(isset(undefined)).toBe(false)
  })
})
