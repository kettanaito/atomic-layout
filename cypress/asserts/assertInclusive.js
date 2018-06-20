export default function assertInclusive(
  firstSelector = '#first',
  secondSelector = '#second',
  thirdSeclector = '#third',
) {
  const assertAllVisible = () => {
    cy.get(firstSelector)
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', secondSelector)
      .haveSameAxis('y', thirdSeclector)
      .notIntersectWith(secondSelector)

    cy.get(secondSelector)
      .should('be.visible')
      .haveArea('second')
      .notIntersectWith(thirdSeclector)

    cy.get(thirdSeclector)
      .should('be.visible')
      .haveArea('third')
  }

  cy.get(firstSelector)
    .should('be.visible')
    .haveArea('first')
    .haveSameAxis('y', secondSelector)
    .notIntersectWith(secondSelector)

  cy.get(secondSelector)
    .should('be.visible')
    .haveArea('second')

  cy.get(thirdSeclector).should('not.be.visible')

  /* Small */
  cy.setBreakpoint('sm').then(assertAllVisible)

  /* Medium */
  cy.setBreakpoint('md').then(assertAllVisible)

  /* Large */
  cy.setBreakpoint('lg').then(() => {
    cy.get(firstSelector)
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', secondSelector)
      .notIntersectWith(secondSelector)

    cy.get(secondSelector)
      .should('be.visible')
      .haveArea('second')

    cy.get(thirdSeclector).should('not.be.visible')
  })

  /* Extra-large */
  cy.setBreakpoint('xl').then(() => {
    cy.get(firstSelector)
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', secondSelector)
      .notIntersectWith(secondSelector)

    cy.get(secondSelector)
      .should('be.visible')
      .haveArea('second')

    cy.get(thirdSeclector).should('not.be.visible')
  })
}
