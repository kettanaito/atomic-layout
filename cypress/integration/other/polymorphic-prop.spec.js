import { expect } from 'chai'

const assertTagName = (tagName) => ($elem) =>
  expect($elem.is(tagName)).to.be.true

describe('Polymorphic prop', () => {
  before(() => {
    cy.visit('/other/polymorphic-prop')
  })

  it('Renders <div> by default', () => {
    cy.get('#default').then(assertTagName('div'))
  })

  it('Renders a tag passed in the "as" prop', () => {
    cy.get('#header').then(assertTagName('header'))
    cy.get('#main').then(assertTagName('main'))
    cy.get('#footer').then(assertTagName('footer'))
  })
})
