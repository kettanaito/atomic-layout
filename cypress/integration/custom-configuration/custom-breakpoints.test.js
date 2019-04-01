it('Supports custom breakpoints and measurement unit', () => {
  cy.loadStory(['core'], ['configuration', 'custom-breakpoints'])

  const assertPadding = (values) => {
    return cy.get('#composition').should('have.css', 'padding', values)
  }

  assertPadding('16px')
  cy.setBreakpoint({
    minWidth: 576,
    maxWidth: 768,
  }).then(() => assertPadding('32px'))
  cy.setBreakpoint({
    minWidth: 769,
  }).then(() => assertPadding('48px'))
})
