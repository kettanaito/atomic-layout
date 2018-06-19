it('Bell', () => {
  cy.visit('/behavior/bell')

  const assertAllVisible = () => {
    cy.assert(['#first', '#second'], 'be.visible')
    cy.assertArea('#first', 'first')
    cy.assertArea('#second', 'second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(() => {
    cy.assert(['#first'], 'be.visible')
    cy.assertArea('#first', 'first')
    cy.assert(['#second'], 'not.be.visible')
  })
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
