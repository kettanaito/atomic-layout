it('Inclusive', () => {
  cy.visit('/behavior/inclusive')

  const assertAllVisible = () => {
    cy.assert(['#first', '#second', '#third'], 'be.visible')
  }

  cy.assert(['#first', '#second'], 'be.visible')
  cy.assert(['#third'], 'not.be.visible')

  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(() => {
    cy.assert(['#first', '#second'], 'be.visible')
    cy.assert(['#third'], 'not.be.visible')
  })
  cy.setBreakpoint('xl').then(() => {
    cy.assert(['#first', '#second'], 'be.visible')
    cy.assert(['#third'], 'not.be.visible')
  })
})
