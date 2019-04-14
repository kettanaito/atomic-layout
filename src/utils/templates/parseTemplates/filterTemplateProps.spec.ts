import filterTemplateProps from './filterTemplateProps'

describe('filterTemplateProps', () => {
  it('returns template props from a given object', () => {
    expect(
      filterTemplateProps({
        template: 'first',
        templateOnly: 'three',
        templateMd: 'second',
        templateCols: true,
        templateBars: true,
      }),
    ).toEqual({
      template: ['first'],
      templateOnly: ['three'],
      templateMd: ['second'],
    })
  })
})
