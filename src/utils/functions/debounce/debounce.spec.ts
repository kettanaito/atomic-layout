import debounce from './debounce'

describe('debounce', () => {
  describe('given debounced a function', () => {
    let count = 0
    const DEBOUNCE_DURATION = 100
    const increment = debounce(() => count++, DEBOUNCE_DURATION)

    afterEach(() => {
      count = 0
    })

    it('should execute initially', () => {
      increment()
      setTimeout(() => {
        expect(count).toEqual(1)
      }, DEBOUNCE_DURATION)
    })

    it('should ignore subsequent calls within debounce duration', () => {
      increment()
      setTimeout(increment, DEBOUNCE_DURATION / 2)
      setTimeout(increment, DEBOUNCE_DURATION)

      setTimeout(() => {
        expect(count).toEqual(1)
      }, DEBOUNCE_DURATION * 2)
    })

    it('should execute subsequent calls outside of debounce duration', () => {
      increment()
      setTimeout(increment, DEBOUNCE_DURATION)

      setTimeout(() => {
        expect(count).toEqual(2)
      }, DEBOUNCE_DURATION * 2)
    })
  })
})
