import invariant from './invariant'

const createConsoleSpy = () => jest.spyOn(console, 'error')

test('Should error when predicate is not satisfied', () => {
  const consoleError = createConsoleSpy()
  const errorMessage = 'Error message'

  invariant(false, errorMessage)
  expect(consoleError).toBeCalledWith(errorMessage)

  consoleError.mockRestore()
})

test('Should do nothing when predicate is satisfied', () => {
  const consoleError = createConsoleSpy()

  invariant(true, 'You should not see this')
  expect(consoleError).not.toBeCalled()

  consoleError.mockRestore()
})
