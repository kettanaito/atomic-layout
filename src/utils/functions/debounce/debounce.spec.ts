import debounce from './debounce'

describe('debounce', () => {
  it('is called once within duration', () => {
    let count = 0
    const increment = debounce(() => count++, 100)

    increment()
    setTimeout(increment, 50)
    setTimeout(increment, 100)

    setTimeout(() => {
      expect(count).toEqual(1)
    }, 200)
  })

  it('can be called multiple times after duration', () => {
    let count = 0
    const increment = debounce(() => count++, 100)
    increment()
    setTimeout(increment, 100)

    setTimeout(() => {
      expect(count).toEqual(2)
    }, 200)
  })
})
