import { expect }             from 'chai'
import sanitizeTemplateString from './index'

test('Sanitizes a template string properly', () => {
  const template = `
    'header header'
    'content aside'
    'footer footer'
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized)
    .to.be.an('array')
    .with.lengthOf(4)
    .that.deep.equals(['header', 'content', 'aside', 'footer'])
})
