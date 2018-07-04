import calc from './calc'

test('Calculates deafult units', () => {
  const res = calc(500, 400, (a, b) => a - b)
  expect(res).toEqual(100)
})

test('Calculates custom units', () => {
  const res = calc('25rem', '10rem', (a, b) => a + b)
  expect(res).toEqual('35rem')
})
