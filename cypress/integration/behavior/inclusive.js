it('Inclusive', () => {
  cy.visitExample('behavior/inclusive')

  const assertAllVisible = () => {
    cy.get('#first').should('be.visible')
    cy.get('#second').should('be.visible')
    cy.get('#third').should('be.visible')
  }

  cy.get('#first').should('be.visible')
  cy.get('#second').should('be.visible')
  cy.get('#third').should('not.be.visible')

  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(() => {
    cy.get('#first').should('be.visible')
    cy.get('#second').should('be.visible')
    cy.get('#third').should('not.be.visible')
  })
  cy.setBreakpoint('xl').then(() => {
    cy.get('#first').should('be.visible')
    cy.get('#second').should('be.visible')
    cy.get('#third').should('not.be.visible')
  })
})
