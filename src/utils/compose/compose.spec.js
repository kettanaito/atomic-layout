import compose from './compose'

test('Composes given functions from right to left', () => {
  const func = compose(
    (arr) => arr.reverse(),
    (str) => str.split(' '),
    (str) => str.toUpperCase(),
  )

  const funcRes = func('Lorem ipsum')
  expect(funcRes).toEqual(['IPSUM', 'LOREM'])
})
