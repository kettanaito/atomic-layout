import when from './when'

const predicate = (num) => num > 5
const call = when(predicate, () => 'foo')

test('Calls given function only when predicate is satisfied', () => {
  expect(call(8)).toBe('foo')
})

test('Returns given arguments when predicate rejects', () => {
  expect(call(3)).toBe(3)
})
