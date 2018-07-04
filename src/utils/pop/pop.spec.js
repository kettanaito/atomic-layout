import pop from './index'

test('Returns the copy of the array with the last entry removed', () => {
  expect(pop([1, 2, 3])).toEqual([1, 2])
  expect(pop([1, 2])).toEqual([1])
  expect(pop([1])).toEqual([])
})

test('Original array remains untouched', () => {
  const arr = [1, 2]
  pop(arr)
  expect(arr).toEqual([1, 2])
})
