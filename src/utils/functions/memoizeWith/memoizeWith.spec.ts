import memoizeWith from './memoizeWith'

describe('memoizeWith', () => {
  it('memoizes a given function', () => {
    let callsCount = 0

    const factorial = memoizeWith((n) => n)((num) => {
      callsCount += 1
      return Array<number>(num)
        .fill(0)
        .map((_, i) => i + 1)
        .reduce<number>((acc, n) => acc * n, 0)
    })

    factorial(5)
    factorial(5)
    factorial(5)

    expect(callsCount).toEqual(1)
  })
})
