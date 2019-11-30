import memoizeWith from './memoizeWith'

describe('memoizeWith', () => {
  describe('given memoized a function', () => {
    let callsCount = 0
    const memoizeWithIdentity = memoizeWith((n) => n)
    const factorial = memoizeWithIdentity((num) => {
      callsCount += 1
      return Array<number>(num)
        .fill(0)
        .map((_, i) => i + 1)
        .reduce<number>((acc, n) => acc * n, 1)
    })

    afterEach(() => {
      callsCount = 0
    })

    it('should return the result when called', () => {
      expect(factorial(5)).toEqual(120)
    })

    it('should return memoized result when given the same arguments', () => {
      factorial(5)
      factorial(5)
      factorial(5)
      expect(callsCount).toEqual(0)
    })

    it('should execute anew for each unique set of arguments', () => {
      factorial(3)
      factorial(4)
      expect(callsCount).toEqual(2)
    })
  })
})
