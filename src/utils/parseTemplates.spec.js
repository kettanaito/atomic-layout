import { expect } from 'chai'
import getPropByName from './getPropByName'
import parseTemplates from './parseTemplates'

const props = {
  template: `
    'header'
    'content'
    'footer'
  `,
  templateMd: `
    'header'
    'content'
    'aside'
    'footer'
  `,
  templateLg: `
    'header header'
    'content aside'
    'footer footer'
  `,
}

const parsedTemplateProps = getPropByName('template', props)

test('Returns proper map of React components', () => {
  const components = parseTemplates(parsedTemplateProps)

  expect(components)
    .to.be.an('object')
    .that.has.all.keys(['Aside', 'Header', 'Content', 'Footer'])
})
