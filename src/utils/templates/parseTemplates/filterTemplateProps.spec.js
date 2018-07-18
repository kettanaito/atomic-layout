import filterTemplateProps from './filterTemplateProps'

test('Returns template props from the given object', () => {
  expect(
    filterTemplateProps({
      template: 'first',
      templateOnly: 'three',
      templateMd: 'second',
      templateCols: true,
      templateBars: true,
    }),
  ).toEqual({
    template: 'first',
    templateOnly: 'three',
    templateMd: 'second',
  })
})
