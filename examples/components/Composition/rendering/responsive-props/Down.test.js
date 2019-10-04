it('Down', () => {
  cy.loadStory(
    ['components', 'composition', 'rendering', 'responsive-props'],
    ['down'],
  )

  const assertPadding = (value) => {
    return cy.get('#element').should('have.css', 'padding', value)
  }

  assertPadding('10px')
  cy.setBreakpoint('sm').then(() => assertPadding('20px'))
  cy.setBreakpoint('md').then(() => assertPadding('30px'))
  cy.setBreakpoint('lg').then(() => assertPadding('40px'))
  cy.setBreakpoint('xl').then(() => assertPadding('50px'))
})
