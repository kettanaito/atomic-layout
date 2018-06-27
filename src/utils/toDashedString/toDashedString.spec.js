import { expect } from 'chai'
import toDashedString from './index'

test('Converts cammelCase to dashed-string', () => {
  expect(toDashedString('loremIpsumDolor')).to.equal('lorem-ipsum-dolor')
})

test('Bypasses strings without capital letter', () => {
  expect(toDashedString('lorem')).to.equal('lorem')
})
