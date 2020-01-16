import sanitizeTemplateArea from './sanitizeTemplateArea'

describe('sanitizeTemplateArea', () => {
  describe('given an arbitrary template string', () => {
    it('should enforce single quotes for new lines', () => {
      expect(sanitizeTemplateArea('foo')).toEqual(`'foo'`)
      expect(sanitizeTemplateArea('foo bar')).toEqual(`'foo bar'`)
    })
  })

  describe('given a template string with duplicate quotes', () => {
    it('should return a parsed template string with deduplicated quotes', () => {
      expect(sanitizeTemplateArea("'foo'")).toEqual(`'foo'`)
      expect(sanitizeTemplateArea("'foo bar'")).toEqual(`'foo bar'`)
    })
  })

  describe('given "grid-template" syntax', () => {
    it('should parse single area definition', () => {
      expect(sanitizeTemplateArea('foo bar 100px')).toEqual(`'foo bar' 100px`)
    })

    it('should parse multi-area definition', () => {
      expect(sanitizeTemplateArea('first second 2fr')).toEqual(
        `'first second' 2fr`,
      )
    })

    it('should return "grid-template-columns" dimensions without quoutes', () => {
      expect(sanitizeTemplateArea('/ 200px auto 1fr')).toEqual(
        `/ 200px auto 1fr`,
      )
    })
  })

  describe('given a template string with placeholder dots', () => {
    it('should return a parsed template string including dots', () => {
      expect(sanitizeTemplateArea('first . second ... third')).toEqual(
        `'first . second ... third'`,
      )
    })
  })
})
