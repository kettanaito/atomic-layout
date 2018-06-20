import assertBell from '../../asserts/assertBell'

it('Bell', () => {
  cy.visit('/behavior/bell')
  assertBell()
})
