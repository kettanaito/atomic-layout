import invariant from './invariant'

const createConsoleSpy = () => jest.spyOn(console, 'error')

test('Errors upon not satisfied predicate', () => {
  const consoleError = createConsoleSpy()
  const errorMessage = 'Error message'

  invariant(false, errorMessage)
  expect(consoleError).toBeCalledWith(errorMessage)

  consoleError.mockRestore()
})

test('Does nothing upon satisfied predicate', () => {
  const consoleError = createConsoleSpy()

  invariant(true, 'You should not see this')
  expect(consoleError).not.toBeCalled()

  consoleError.mockRestore()
})
