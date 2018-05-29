import { expect } from 'chai'
import toRem from './toRem'

test('Suffixes numeric values with "rem" string', () => {
  expect(toRem(5)).to.equal('5rem')
})

test('Returns string values as is', () => {
  expect(toRem('2vh')).to.equal('2vh')
})
