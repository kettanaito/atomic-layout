it('Inclusive', () => {
  cy.visit('/behavior/inclusive')

  const assertAllVisible = () => {
    cy.get('#first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('#second', 'y')
      .haveSameAxis('#third', 'y')
      .notIntersectWith('#second')

    cy.get('#second')
      .should('be.visible')
      .haveArea('second')
      .notIntersectWith('#third')

    cy.get('#third')
      .should('be.visible')
      .haveArea('third')
  }

  cy.get('#first')
    .should('be.visible')
    .haveArea('first')
    .haveSameAxis('#second', 'y')
    .notIntersectWith('#second')

  cy.get('#second')
    .should('be.visible')
    .haveArea('second')

  cy.get('#third').should('not.be.visible')

  /* Small */
  cy.setBreakpoint('sm').then(assertAllVisible)

  /* Medium */
  cy.setBreakpoint('md').then(assertAllVisible)

  /* Large */
  cy.setBreakpoint('lg').then(() => {
    cy.get('#first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('#second', 'y')
      .notIntersectWith('#second')

    cy.get('#second')
      .should('be.visible')
      .haveArea('second')

    cy.get('#third').should('not.be.visible')
  })

  /* Extra-large */
  cy.setBreakpoint('xl').then(() => {
    cy.get('#first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('#second', 'y')
      .notIntersectWith('#second')

    cy.get('#second')
      .should('be.visible')
      .haveArea('second')

    cy.get('#third').should('not.be.visible')
  })
})
