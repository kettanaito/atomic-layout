import sanitizeTemplateString from './sanitizeTemplateString'

describe('sanitizeTemplateString', () => {
  it('sanitizes string with quotes', () => {
    const sanitized = sanitizeTemplateString(`
      'header header'
      'content aside'
      'footer footer'
    `)
    expect(sanitized).toEqual(['aside', 'content', 'footer', 'header'])
  })

  it('sanitizes string without quotes', () => {
    const sanitized = sanitizeTemplateString(`
      first first
      second third
      fourth fourth
    `)
    expect(sanitized).toEqual(['first', 'fourth', 'second', 'third'])
  })

  it('sanitizes string without indentation', () => {
    const sanitized = sanitizeTemplateString(`
first first
second third
    `)
    expect(sanitized).toEqual(['first', 'second', 'third'])
  })
})
