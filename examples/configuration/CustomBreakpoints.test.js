it('Supports custom breakpoints', () => {
  cy.loadStory(
    ['configuration', 'custom-configuration'],
    ['custom-breakpoints'],
  )

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
