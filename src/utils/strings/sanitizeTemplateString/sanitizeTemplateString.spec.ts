import sanitizeTemplateString from './sanitizeTemplateString'

describe('sanitizeTemplateString', () => {
  it('sanitizes string with quotes', () => {
    const areas = sanitizeTemplateString(`
      header header
      content aside
      footer footer
    `)
    expect(areas).toEqual(['aside', 'content', 'footer', 'header'])
  })

  it('sanitizes string without quotes', () => {
    const areas = sanitizeTemplateString(`
      first first
      second third
      fourth fourth
    `)
    expect(areas).toEqual(['first', 'fourth', 'second', 'third'])
  })

  it('sanitizes string without indentation', () => {
    const areas = sanitizeTemplateString(`
first first
second third
    `)
    expect(areas).toEqual(['first', 'second', 'third'])
  })

  it('sanitizes "grid-template" string', () => {
    const areas = sanitizeTemplateString(`
      200px 1fr
      header header 100px
      content aside auto
    `)

    expect(areas).toEqual(['aside', 'content', 'header'])
  })
})
