import assertNotch from '../../asserts/assertNotch'

it('Notch', () => {
  cy.visit('/behavior/notch')
  assertNotch()
})
