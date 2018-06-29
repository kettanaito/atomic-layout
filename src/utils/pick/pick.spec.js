import pick from './pick'
import { expect } from 'chai'

test('Returns an object with the picked properties based on strings', () => {
  const pickExact = pick(['a', 'c'])

  expect(
    pickExact({
      a: 'foo',
      b: 'bar',
      c: 'baz',
    }),
  ).to.deep.equal({
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
  ).to.deep.equal({
    gutter: 10,
    gutterMd: 20,
  })
})

test('Returns an empty object when picking predicate not satisfied', () => {
  const pickFoo = pick(['foo'])
  expect(pickFoo({ bar: true })).to.deep.equal({})

  const pickTemplate = pick([/^template/])
  expect(pickTemplate({ foo: 'bar' })).to.deep.equal({})
})
