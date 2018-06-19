it('Bell', () => {
  cy.visit('/behavior/bell')

  const assertAllVisible = () => {
    cy.get('#first').should('be.visible')
    cy.get('#second').should('be.visible')

    cy.assertArea('#first', 'first')
    cy.assertArea('#second', 'second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(() => {
    cy.get('#first').should('be.visible')
    cy.assertArea('#first', 'first')

    cy.get('#second').should('not.be.visible')
  })
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
