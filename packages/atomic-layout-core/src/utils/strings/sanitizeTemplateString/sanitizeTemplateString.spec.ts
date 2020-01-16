import sanitizeTemplateString from './sanitizeTemplateString'

describe('sanitizeTemplateString', () => {
  describe('given a template string with quotes', () => {
    it('should return the list of areas names', () => {
      const areas = sanitizeTemplateString(`
        'header header'
        'content aside'
        'footer footer'
      `)
      expect(areas).toEqual(['aside', 'content', 'footer', 'header'])
    })
  })

  describe('given a template string without quotes', () => {
    it('should return the list of areas names', () => {
      const areas = sanitizeTemplateString(`
        first first
        second third
        fourth fourth
      `)
      expect(areas).toEqual(['first', 'fourth', 'second', 'third'])
    })
  })

  describe('given a template string without indentation', () => {
    it('should return the list of areas names', () => {
      const areas = sanitizeTemplateString(`
first first
second third
      `)
      expect(areas).toEqual(['first', 'second', 'third'])
    })
  })

  describe('given a template string with arbitrary indentation', () => {
    it('should return the list of areas names', () => {
      const areas = sanitizeTemplateString(`
  first first
      second third
      `)
      expect(areas).toEqual(['first', 'second', 'third'])
    })
  })

  describe('given a template string written in "grid-template" syntax', () => {
    let areas: string[]

    beforeAll(() => {
      areas = sanitizeTemplateString(`
        200px 1fr
        header header 100px
        content aside auto
      `)
    })

    it('should not contain any dimensions', () => {
      expect(areas).not.toContain('200px')
      expect(areas).not.toContain('1fr')
      expect(areas).not.toContain('100px')
      expect(areas).not.toContain('auto')
    })

    it('should return the list of areas names', () => {
      expect(areas).toHaveLength(3)
      expect(areas).toContain('aside')
      expect(areas).toContain('content')
      expect(areas).toContain('header')
    })
  })

  describe('given a template string with placeholder dots', () => {
    let areas: string[]

    beforeAll(() => {
      areas = sanitizeTemplateString(`
        first . second
        third fourth .
      `)
    })

    it('should contain list of areas names', () => {
      expect(areas).toContain('first')
      expect(areas).toContain('second')
      expect(areas).toContain('third')
      expect(areas).toContain('fourth')
    })

    it('should not any contain placeholder characters', () => {
      expect(areas).not.toContain('.')
    })
  })
})
