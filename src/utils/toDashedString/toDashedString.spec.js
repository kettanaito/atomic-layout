import { expect }    from 'chai'
import toDashedStrng from './index'

test('Converts cammelCase to dashed-string', () => {
  expect(toDashedStrng('loremIpsumDolor')).to.equal('lorem-ipsum-dolor')
})
