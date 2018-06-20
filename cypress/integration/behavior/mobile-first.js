it('Mobile first', () => {
  cy.visit('/behavior/mobile-first')

  const assertAllVisible = () => {
    cy.get('#first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('#second', 'y')
      .notIntersectWith('#second')

    cy.get('#second')
      .should('be.visible')
      .haveArea('second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
