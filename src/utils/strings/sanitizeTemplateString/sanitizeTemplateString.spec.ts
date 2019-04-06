import sanitizeTemplateString from './sanitizeTemplateString'

describe('Sanitizes a given template string', () => {
  test('with wrapping quotes', () => {
    const template = `
      'header header'
      'content aside'
      'footer footer'
    `

    const sanitized = sanitizeTemplateString(template)
    expect(sanitized).toEqual(['aside', 'content', 'footer', 'header'])
  })

  test('without wrapping quotes', () => {
    const template = `
      first first
      second third
      fourth fourth
    `

    const sanitized = sanitizeTemplateString(template)
    expect(sanitized).toEqual(['first', 'fourth', 'second', 'third'])
  })

  test('with different indentation', () => {
    const template = `
  first
    second
      third
    `

    const sanitized = sanitizeTemplateString(template)
    expect(sanitized).toEqual(['first', 'second', 'third'])
  })

  test('without indentation', () => {
    const template = `
first first
second third
    `

    const sanitized = sanitizeTemplateString(template)
    expect(sanitized).toEqual(['first', 'second', 'third'])
  })
})
