import pick from './pick'
import { expect } from 'chai'

test('Returns a passed object with only the picked properties', () => {
  const obj = { a: 'foo', b: 'bar', c: 'baz' }
  const picked = pick(obj, ['a', 'c'])
  expect(picked).to.deep.equal({ a: 'foo', c: 'baz' })
})
