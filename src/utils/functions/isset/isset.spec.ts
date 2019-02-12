import isset from './isset'

test('Returns "true" when a variable is set', () => {
  expect(isset(0)).toBe(true)
  expect(isset('')).toBe(true)
  expect(isset('a')).toBe(true)
  expect(isset([])).toBe(true)
  expect(isset({})).toBe(true)
  expect(isset(function() {})).toBe(true)
})

test('Returns "false" when a variable is not set', () => {
  expect(isset(null)).toBe(false)
  expect(isset(undefined)).toBe(false)
})
