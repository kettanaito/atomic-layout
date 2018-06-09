it('Mobile first', () => {
  cy.visitExample('behavior/mobile-first')

  const assertAllVisible = () => {
    cy.get('#first').should('be.visible')
    cy.get('#second').should('be.visible')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
