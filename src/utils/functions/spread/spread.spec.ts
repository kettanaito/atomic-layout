import spread from './spread'

test('Spreads the given iterable into the arguments of the passed function', () => {
  const call = spread((a: number, b: number, c: number) => {
    expect(a).toBe(1)
    expect(b).toBe(2)
    expect(c).toBe(3)
  })

  call([1, 2, 3])
})
