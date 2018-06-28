import { expect } from 'chai'
import findTemplateProps from './filterTemplateProps'

test('returns an object with only properties that match the template key definition', () => {
  const props = {
    template: '',
    templateSmDown: '',
    gutter: '',
    TeMpLaTe: '',
    bar: '',
  }

  const expectedTemplateProps = {
      template: '',
      templateSmDown: ''
  }

  const templateProps = findTemplateProps(props)
  expect(templateProps).to.deep.equal(expectedTemplateProps)
})
