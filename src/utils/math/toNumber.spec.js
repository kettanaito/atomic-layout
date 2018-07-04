import toNumber from './toNumber'

test('Bypasses numbers convertion', () => {
  expect(toNumber(42)).toEqual(42)
})

test('Converts strings to numbers', () => {
  expect(toNumber('123vw')).toEqual(123)
  expect(toNumber('24px')).toEqual(24)
  expect(toNumber('52%')).toEqual(52)
})
