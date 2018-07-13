import pick from './pick'

test('Returns an object with the picked properties based on strings', () => {
  const pickExact = pick(['a', 'c'])

  expect(
    pickExact({
      a: 'foo',
      b: 'bar',
      c: 'baz',
    }),
  ).toEqual({
    a: 'foo',
    c: 'baz',
  })
})

test('Returns an object with the picked properties based on RegExp', () => {
  /* Note that ambiguity check must be explicit */
  const pickGutter = pick([/^gutter(?=[A-Z]|$)/])

  expect(
    pickGutter({
      foo: 'bar',
      gutter: 10,
      gutterMd: 20,
      gutters: false,
    }),
  ).toEqual({
    gutter: 10,
    gutterMd: 20,
  })
})

test('Returns an empty object when picking predicate not satisfied', () => {
  const pickFoo = pick(['foo'])
  expect(pickFoo({ bar: true })).toEqual({})

  const pickTemplate = pick([/^template/])
  expect(pickTemplate({ foo: 'bar' })).toEqual({})
})
