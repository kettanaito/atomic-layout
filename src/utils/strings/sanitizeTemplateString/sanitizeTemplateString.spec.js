import sanitizeTemplateString from './'

test('Sanitizes a template string properly', () => {
  const template = `
    'header header'
    'content aside'
    'footer footer'
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['header', 'content', 'aside', 'footer'])
})
