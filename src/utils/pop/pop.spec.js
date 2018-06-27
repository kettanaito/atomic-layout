import { expect } from 'chai'
import pop from './index'

test('Returns the copy of the array with the last entry removed', () => {
  expect(pop([1, 2, 3])).to.deep.equal([1, 2])
  expect(pop([1, 2])).to.deep.equal([1])
  expect(pop([1])).to.deep.equal([])
})

test('Original array remains untouched', () => {
  const arr = [1, 2]
  pop(arr)
  expect(arr).to.deep.equal([1, 2])
})
