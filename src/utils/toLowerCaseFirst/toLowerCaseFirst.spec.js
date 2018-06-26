import { expect }       from 'chai'
import toLowerCaseFirst from './index'

test('Transforms first letter to lowercase', () => {
  expect(toLowerCaseFirst('Foo')).to.equal('foo')
  expect(toLowerCaseFirst('FooBar')).to.equal('fooBar')
})
