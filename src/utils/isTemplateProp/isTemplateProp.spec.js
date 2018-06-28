import { expect } from 'chai'
import isTemplateProp from './isTemplateProp'

test('Can tell if a prop is a template prop', () => {
  expect(isTemplateProp('templateMdOnly')).to.equal(true)
  expect(isTemplateProp('template')).to.equal(true)

  expect(isTemplateProp('TemplateMdOnly')).to.equal(false)
  expect(isTemplateProp('templaTe')).to.equal(false)
})
