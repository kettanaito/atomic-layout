import memoizeWith from './memoizeWith'

test('Memoizes the given function', () => {
  let count = 0

  const factorial = memoizeWith((n) => n)((n) => {
    count += 1
    return Array(n)
      .fill()
      .map((_, i) => i + 1)
      .reduce((acc, num) => acc * num)
  })

  factorial(5)
  factorial(5)
  factorial(5)

  expect(count).toEqual(1)
})
