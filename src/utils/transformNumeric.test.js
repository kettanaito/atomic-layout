import { expect } from 'chai'
import transformNumeric from './transformNumeric'

test('Suffixes numeric values with "rem" string', () => {
  expect(transformNumeric(5)).to.equal('5rem')
})

test('Returns string values as is', () => {
  expect(transformNumeric('2vh')).to.equal('2vh')
})
