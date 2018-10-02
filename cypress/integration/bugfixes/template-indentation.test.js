import assertMobileFirst from '../../asserts/assertMobileFirst'

it('Supports unindented template strings', () => {
  cy.visit('/bugfixes/template-indentation')

  cy.get('#first')
    .should('be.visible')
    .haveArea('first')
    .notIntersectWith('#second')

  cy.get('#second')
    .should('be.visible')
    .haveArea('second')
})
