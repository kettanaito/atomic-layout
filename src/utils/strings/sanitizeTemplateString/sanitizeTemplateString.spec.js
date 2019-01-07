import sanitizeTemplateString from './'

test('Sanitizes a template string with quotes', () => {
  const template = `
    'header header'
    'content aside'
    'footer footer'
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['aside', 'content', 'footer', 'header'])
})

test('Sanitizes template string without quotes', () => {
  const template = `
    first first
    second third
    fourth fourth
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['first', 'fourth', 'second', 'third'])
})

test('Sanitizes a template string without indentation', () => {
  const template = `
first first
second third
  `

  const sanitized = sanitizeTemplateString(template)
  expect(sanitized).toEqual(['first', 'second', 'third'])
})
