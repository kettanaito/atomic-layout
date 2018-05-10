import { expect } from 'chai'
import toRem from './toRem'

test('converts to rem value properly', () => {
  expect(toRem(5)).to.equal('5rem')
})
