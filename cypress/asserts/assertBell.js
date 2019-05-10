export default function assertBell() {
  const assertAllVisible = () => {
    cy.get('#inclusive-first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', '#inclusive-second')
      .haveSameAxis('y', '#inclusive-third')
      .notIntersectWith('#inclusive-second')

    cy.get('#inclusive-second')
      .should('be.visible')
      .haveArea('second')
      .notIntersectWith('#inclusive-third')

    cy.get('#inclusive-third')
      .should('be.visible')
      .haveArea('third')
  }

  cy.get('#inclusive-first')
    .should('be.visible')
    .haveArea('first')
    .haveSameAxis('y', '#inclusive-second')
    .notIntersectWith('#inclusive-second')

  cy.get('#inclusive-second')
    .should('be.visible')
    .haveArea('second')

  cy.get('#inclusive-third').should('not.be.visible')

  /* Small */
  cy.setBreakpoint('sm').then(assertAllVisible)

  /* Medium */
  cy.setBreakpoint('md').then(assertAllVisible)

  /* Large */
  cy.setBreakpoint('lg').then(() => {
    cy.get('#inclusive-first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', '#inclusive-second')
      .notIntersectWith('#inclusive-second')

    cy.get('#inclusive-second')
      .should('be.visible')
      .haveArea('second')

    cy.get('#inclusive-third').should('not.be.visible')
  })

  /* Extra-large */
  cy.setBreakpoint('xl').then(() => {
    cy.get('#inclusive-first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', '#inclusive-second')
      .notIntersectWith('#inclusive-second')

    cy.get('#inclusive-second')
      .should('be.visible')
      .haveArea('second')

    cy.get('#inclusive-third').should('not.be.visible')
  })
}
