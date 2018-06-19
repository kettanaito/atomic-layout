it('Mobile first', () => {
  cy.visit('/behavior/mobile-first')

  const assertAllVisible = () => {
    cy.assert(['#first', '#second'], 'be.visible')
    cy.assertArea('#first', 'first')
    cy.assertArea('#second', 'second')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
