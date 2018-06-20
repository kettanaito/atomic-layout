import assertMobileFirst from '../../asserts/assertMobileFirst'

it('Mobile first', () => {
  cy.visit('/behavior/mobile-first')
  assertMobileFirst()
})
