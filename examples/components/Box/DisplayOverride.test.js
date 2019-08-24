it('Supports CSS properties overrides', () => {
  cy.loadStory(['components', 'box'], ['properties-override'])

  cy.get('#box')
    .should('be.visible')
    .should('have.css', 'display', 'table')
})
