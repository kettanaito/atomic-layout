import sanitizeTemplateArea from './sanitizeTemplateArea'

describe('sanitizeTemplateArea', () => {
  it('enforces single quotes for new lines', () => {
    const sanitized = sanitizeTemplateArea('foo')
    expect(sanitized).toEqual("'foo'")

    const multilineSanitized = sanitizeTemplateArea('foo bar')
    expect(multilineSanitized).toEqual("'foo bar'")
  })

  it('removes duplicate single quotes', () => {
    const sanitized = sanitizeTemplateArea("'foo'")
    expect(sanitized).toEqual("'foo'")

    const multilineSanitized = sanitizeTemplateArea("'foo bar'")
    expect(multilineSanitized).toEqual("'foo bar'")
  })
})
