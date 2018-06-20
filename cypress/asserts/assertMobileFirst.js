export default function mobileFirst(
  firstSelector = '#first',
  secondSelector = '#second',
) {
  const assertAllVisible = () => {
    cy.get(firstSelector)
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', secondSelector)
      .notIntersectWith(secondSelector)

    cy.get(secondSelector)
      .should('be.visible')
      .haveArea('second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
}
