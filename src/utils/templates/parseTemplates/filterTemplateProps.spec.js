import filterTemplateProps from './filterTemplateProps'

test('Returns template props from the given object', () => {
  expect(
    filterTemplateProps({
      template: 'first',
      templateMd: 'second',
      templateCols: true,
      templateBars: true,
    }),
  ).toEqual({
    template: 'first',
    templateMd: 'second',
  })
})
