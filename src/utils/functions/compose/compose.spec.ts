import compose from './compose'

test('Composes given functions from right to left', () => {
  const func = compose(
    (arr: string[]) => arr.reverse(),
    (str: string) => str.split(' '),
    (str: string) => str.toUpperCase(),
  )

  const funcRes = func('Lorem ipsum')
  expect(funcRes).toEqual(['IPSUM', 'LOREM'])
})
