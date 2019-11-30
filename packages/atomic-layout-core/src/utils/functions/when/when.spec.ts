import when from './when'

describe('when', () => {
  const predicate = (num: number) => num > 5
  const call = when(predicate, () => 'foo')

  describe('given a predicate resolves', () => {
    it('should call the function', () => {
      expect(call(8)).toBe('foo')
    })
  })

  describe('given a predicate rejects', () => {
    it('should return the input as-is', () => {
      expect(call(3)).toBe(3)
    })
  })
})
