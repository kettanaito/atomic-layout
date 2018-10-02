import sanitizeTemplateString from './'

test('Sanitizes a template string with quotes', () => {
  const template = `
    'header header'
    'content aside'
    'footer footer'
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['header', 'content', 'aside', 'footer'])
})

test('Sanitizes template string without quotes', () => {
  const template = `
    first first
    second third
    fourth fourth
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['first', 'second', 'third', 'fourth'])
})

test('Sanitizes a template string without indentation', () => {
  const template = `
first first
second third
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['first', 'second', 'third'])
})
