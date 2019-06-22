it('Mobile first', () => {
  cy.loadStory(['core'], ['rendering', 'mobile-first'])

  const assertInline = () => {
    cy.get('#composition').assertAreas([['left', 'center', 'right']])
  }

  assertInline()
  cy.setBreakpoint('sm').then(assertInline)
  cy.setBreakpoint('md').then(assertInline)
  cy.setBreakpoint('lg').then(assertInline)
  cy.setBreakpoint('xl').then(assertInline)
})
