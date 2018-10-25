export default function assertNotch() {
  const assertAllVisible = () => {
    cy.get('#notch-first')
      .should('be.visible')
      .haveArea('first')
      .haveSameAxis('y', '#notch-second')
      .notIntersectWith('#notch-second')

    cy.get('#notch-second')
      .should('be.visible')
      .haveArea('second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(() => {
    cy.get('#notch-first')
      .should('be.visible')
      .haveArea('first')

    cy.get('#notch-second').should('not.be.visible')
  })
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
}
