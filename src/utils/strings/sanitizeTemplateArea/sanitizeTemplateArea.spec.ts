import sanitizeTemplateArea from './sanitizeTemplateArea'

describe('sanitizeTemplateArea', () => {
  it('enforces single quotes for new lines', () => {
    expect(sanitizeTemplateArea('foo')).toEqual(`'foo'`)
    expect(sanitizeTemplateArea('foo bar')).toEqual(`'foo bar'`)
  })

  it('deduplicates single quotes', () => {
    expect(sanitizeTemplateArea("'foo'")).toEqual(`'foo'`)

    expect(sanitizeTemplateArea("'foo bar'")).toEqual(`'foo bar'`)
  })

  describe('when given "grid-template" syntax', () => {
    it('supports single area definition', () => {
      expect(sanitizeTemplateArea('foo bar 100px')).toEqual(`'foo bar' 100px`)
    })

    it('supports multi-area definition', () => {
      expect(sanitizeTemplateArea('first second 2fr')).toEqual(
        `'first second' 2fr`,
      )
    })

    it('returns "grid-template-columns" dimensions without quoutes', () => {
      expect(sanitizeTemplateArea('/ 200px auto 1fr')).toEqual(
        `/ 200px auto 1fr`,
      )
    })
  })
})
