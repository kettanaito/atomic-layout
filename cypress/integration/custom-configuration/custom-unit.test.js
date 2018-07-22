import assertBell from '../../asserts/assertBell'

it('Supports custom measurement unit with default breakpoints', () => {
  cy.visit('/custom-configuration/custom-unit')
  assertBell()
})
