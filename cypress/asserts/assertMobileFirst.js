export default function mobileFirst() {
  const assertAllVisible = () => {
    cy.get('#mobile-first-first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', '#mobile-first-second')
      .notIntersectWith('#mobile-first-second')

    cy.get('#mobile-first-second')
      .should('be.visible')
      .haveArea('second')
  }

  assertAllVisible()

  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
}
