import invariant from './invariant'

describe('invariant', () => {
  describe('given predicate is satisfied', () => {
    it('should not throw any errors', () => {
      const run = () => invariant(true, 'You should not see this')
      expect(run).not.toThrow()
    })
  })

  describe('given predicate is not satisfied', () => {
    it('should throw an error with the correct message', () => {
      const errorMessage = 'Error message'
      const run = () => invariant(false, errorMessage)

      expect(run).toThrowError(errorMessage)
    })
  })
})
