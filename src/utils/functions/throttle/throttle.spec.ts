import throttle from './throttle'

describe('throttle', () => {
  let payload: number = 0

  afterEach(() => {
    payload = 0
  })

  const func = throttle((amount: number = 1) => {
    payload += amount
  }, 50)

  it('should not be called more than once per interval', (done) => {
    func() // 1 (leading)
    func() // ignore
    setTimeout(func, 30) // ignore
    setTimeout(func, 60) // 2
    setTimeout(func, 70) // 3 (trailing)

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
    func(5)
    setTimeout(() => {
      expect(payload).toBe(5)
    }, 50)
  })
})
