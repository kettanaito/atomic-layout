import filterTemplateProps, { TemplateProps } from './filterTemplateProps'

describe('filterTemplateProps', () => {
  describe('given an object with arbitrary props', () => {
    let templateProps: TemplateProps

    beforeAll(() => {
      templateProps = filterTemplateProps({
        template: 'first',
        templateOnly: 'three',
        templateMd: 'second',
        templateCols: true,
        templateBars: true,

        randomProp: 'yes',
        yetAnotherUknownProp: true,
      })
    })

    it('should ignore non-template props', () => {
      expect(templateProps).not.toContain('randomProp')
      expect(templateProps).not.toContain('yetAnotherUknownProp')
    })

    it('should return template props', () => {
      expect(templateProps).toEqual({
        template: ['first'],
        templateOnly: ['three'],
        templateMd: ['second'],
      })
    })
  })
})
