import assertNotch from '../../asserts/assertNotch'

it('Supports custom measurement unit with default breakpoints', () => {
  cy.visit('/custom-configuration/custom-unit')
  assertNotch()
})
