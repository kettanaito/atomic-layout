import memoizeWith from './memoizeWith'

const factorial = (num: number) => {
  return Array(num)
    .fill(0)
    .map((_, i) => i + 1)
    .reduce<number>((acc, n) => acc * n, 1)
}

const factorialMock = jest.fn(factorial)

describe('memoizeWith', () => {
  describe('given memoized a function', () => {
    let memoizedFactorial: typeof factorial

    beforeAll(() => {
      const memoizeWithIdentity = memoizeWith<typeof factorial>((n) =>
        String(n),
      )
      memoizedFactorial = memoizeWithIdentity(factorialMock)
    })

    afterEach(() => {
      factorialMock.mockClear()
    })

    it('should return the result when called', () => {
      expect(memoizedFactorial(5)).toEqual(120)
      expect(factorialMock).toBeCalledTimes(1)
    })

    it('should return memoized result when given the same arguments', () => {
      memoizedFactorial(5)
      memoizedFactorial(5)
      memoizedFactorial(5)
      expect(factorialMock).toBeCalledTimes(0)
    })

    it('should execute anew for each unique set of arguments', () => {
      memoizedFactorial(3)
      memoizedFactorial(4)
      expect(factorialMock).toBeCalledTimes(2)
    })
  })
})
