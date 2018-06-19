it('Inclusive', () => {
  cy.visit('/behavior/inclusive')

  const assertAllVisible = () => {
    cy.assert(['#first', '#second', '#third'], 'be.visible')
    cy.assertArea('#first', 'first')
    cy.assertArea('#second', 'second')
    cy.assertArea('#third', 'third')
  }

  cy.assert(['#first', '#second'], 'be.visible')
  cy.assertArea('#first', 'first')
  cy.assertArea('#second', 'second')
  cy.assert(['#third'], 'not.be.visible')

  /* Small */
  cy.setBreakpoint('sm').then(assertAllVisible)

  /* Medium */
  cy.setBreakpoint('md').then(assertAllVisible)

  /* Large */
  cy.setBreakpoint('lg').then(() => {
    cy.assert(['#first', '#second'], 'be.visible')
    cy.assertArea('#first', 'first')
    cy.assertArea('#second', 'second')

    cy.assert(['#third'], 'not.be.visible')
  })

  /* Extra-large */
  cy.setBreakpoint('xl').then(() => {
    cy.assert(['#first', '#second'], 'be.visible')
    cy.assertArea('#first', 'first')
    cy.assertArea('#second', 'second')

    cy.assert(['#third'], 'not.be.visible')
  })
})
