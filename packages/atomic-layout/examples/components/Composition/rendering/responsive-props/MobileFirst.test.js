it('Mobile first', () => {
  cy.loadStory(
    ['components', 'composition', 'rendering', 'responsive-props'],
    ['mobile-first'],
  )

  const assertGutter = () => {
    return cy.get('#composition').should('have.css', 'grid-gap', '10px 10px')
  }

  assertGutter()
  cy.setBreakpoint('sm').then(assertGutter)
  cy.setBreakpoint('md').then(assertGutter)
  cy.setBreakpoint('lg').then(assertGutter)
  cy.setBreakpoint('xl').then(assertGutter)
})
