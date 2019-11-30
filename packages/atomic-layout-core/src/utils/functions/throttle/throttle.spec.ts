import throttle from './throttle'

describe('throttle', () => {
  let payload: number = 0

  afterEach(() => {
    payload = 0
  })

  const func = (amount: number = 1) => {
    payload += amount
  }
  const throttledFunc = throttle<typeof func>(func, 50)

  it('should not be called more than once per interval', (done) => {
    throttledFunc() // 1 (leading)
    throttledFunc() // ignore
    setTimeout(throttledFunc, 30) // ignore
    setTimeout(throttledFunc, 60) // 2
    setTimeout(throttledFunc, 70) // 3 (trailing)

    setTimeout(
      () => {
        expect(payload).toBe(3)
        done()
      },
      // Await for last call timestamp + interval
      // for the trailing function call.
      120,
    )
  })

  it('should preserve original call signature', () => {
    throttledFunc(5)
    setTimeout(() => {
      expect(payload).toBe(5)
    }, 50)
  })
})
