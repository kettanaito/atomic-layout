import { expect } from 'chai'
import toNumber from './toNumber'

test('Bypasses numbers convertion', () => {
  expect(toNumber(42)).to.equal(42)
})

test('Converts strings to numbers', () => {
  expect(toNumber('123vw')).to.equal(123)
  expect(toNumber('24px')).to.equal(24)
  expect(toNumber('52%')).to.equal(52)
})
