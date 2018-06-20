export default function assertBell(
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
  cy.setBreakpoint('md').then(() => {
    cy.get(firstSelector)
      .should('be.visible')
      .haveArea('first')

    cy.get(secondSelector).should('not.be.visible')
  })
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
}
