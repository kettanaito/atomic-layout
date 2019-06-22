export const assertNotch = () => {
  const assertAllVisible = () => {
    cy.get('#notch').assertAreas([['left', 'center', 'right']])
  }

  const assertCenterHidden = () => {
    cy.get('#notch').assertAreas([['left', 'right']])
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertCenterHidden)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
}

it('Notch', () => {
  cy.loadStory(['core'], ['rendering', 'notch'])
})
