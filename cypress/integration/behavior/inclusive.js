it('Inclusive', () => {
  cy.visit('/behavior/inclusive')

  const assertAllVisible = () => {
    cy.get('#first').should('be.visible')
    cy.assertArea('#first', 'first')

    cy.get('#second').should('be.visible')
    cy.assertArea('#second', 'second')

    cy.get('#third').should('be.visible')
    cy.assertArea('#third', 'third')
  }

  cy.get('#first').should('be.visible')
  cy.assertArea('#first', 'first')

  cy.get('#second').should('be.visible')
  cy.assertArea('#second', 'second')

  cy.get('#third').should('not.be.visible')

  /* Small */
  cy.setBreakpoint('sm').then(assertAllVisible)

  /* Medium */
  cy.setBreakpoint('md').then(assertAllVisible)

  /* Large */
  cy.setBreakpoint('lg').then(() => {
    cy.get('#first').should('be.visible')
    cy.assertArea('#first', 'first')

    cy.get('#second').should('be.visible')
    cy.assertArea('#second', 'second')

    cy.get('#third').should('not.be.visible')
  })

  /* Extra-large */
  cy.setBreakpoint('xl').then(() => {
    cy.get('#first').should('be.visible')
    cy.assertArea('#first', 'first')

    cy.get('#second').should('be.visible')
    cy.assertArea('#second', 'second')

    cy.get('#third').should('not.be.visible')
  })
})
