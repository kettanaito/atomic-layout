import { expect } from 'chai'
import capitalize from './capitalize'

test('Capitalizes the given string', () => {
  expect(capitalize('foo')).to.equal('Foo')
  expect(capitalize('fooSome')).to.equal('FooSome')
})
