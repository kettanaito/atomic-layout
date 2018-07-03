import { expect } from 'chai'
import capitalize from './'

test('Capitalizes the given string', () => {
  expect(capitalize('foo')).to.equal('Foo')
  expect(capitalize('fooSome')).to.equal('FooSome')
})
