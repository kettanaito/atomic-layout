export const assertBell = () => {
  const assertAllVisible = () =>
    cy.get('#bell').assertAreas([['first', 'second', 'third']])

  const assertThirdHidden = () =>
    cy.get('#bell').assertAreas([['first', 'second', false]])

  assertThirdHidden()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertThirdHidden)
  cy.setBreakpoint('lg').then(assertThirdHidden)
}

it('Bell', () => {
  cy.loadStory(['core'], ['rendering', 'bell'])

  assertBell()
})
