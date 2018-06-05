import { expect } from 'chai'
import defaultOptions from './const/defaultOptions'
import Layout from './Layout'

test('default options', () => {
  expect(Layout).to.have.property('defaultUnit', defaultOptions.defaultUnit)
  expect(Layout).to.have.property('breakpoints', defaultOptions.breakpoints)
})

test('custom options', () => {
  expect(Layout)
    .to.have.property('configure')
    .to.be.a('function')

  Layout.configure({
    defaultUnit: 'rem',
  })

  expect(Layout).to.have.property('defaultUnit', 'rem')
})
