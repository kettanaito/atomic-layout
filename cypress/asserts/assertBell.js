export default function assertBell() {
  const assertAllVisible = () => {
    cy.get('#bell-first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', '#bell-second')
      .notIntersectWith('#bell-second')

    cy.get('#bell-second')
      .should('be.visible')
      .haveArea('second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(() => {
    cy.get('#bell-first')
      .should('be.visible')
      .haveArea('first')

    cy.get('#bell-second').should('not.be.visible')
  })
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
}
