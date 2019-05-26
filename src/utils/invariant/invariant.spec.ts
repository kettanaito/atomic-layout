import invariant from './invariant'

describe('invariant', () => {
  it('errors when predicate is not satisfied', () => {
    const errorMessage = 'Error message'
    const run = () => invariant(false, errorMessage)

    expect(run).toThrowError(errorMessage)
  })

  it('does nothing on truthy predicate', () => {
    const run = () => invariant(true, 'You should not see this')
    expect(run).not.toThrow()
  })
})
