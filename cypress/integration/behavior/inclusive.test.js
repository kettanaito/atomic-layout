import assertInclusive from '../../asserts/assertInclusive'

it('Inclusive', () => {
  cy.visit('/behavior/inclusive')
  assertInclusive()
})
