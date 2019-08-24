it('Breakpoint-specific', () => {
  cy.loadStory(
    ['components', 'composition', 'rendering', 'responsive-props'],
    ['breakpoint-specific'],
  )

  const assertGutter = (values) => {
    return cy.get('#composition').should('have.css', 'grid-gap', values)
  }

  assertGutter('10px 10px')
  cy.setBreakpoint('sm').then(() => assertGutter('20px 20px'))
  cy.setBreakpoint('md').then(() => assertGutter('30px 30px'))
  cy.setBreakpoint('lg').then(() => assertGutter('40px 40px'))
  cy.setBreakpoint('xl').then(() => assertGutter('50px 50px'))
})
