it('Box: Allows "display" value override', () => {
  cy.loadStory(['bugfixes'], ['all', 'box-display-override'])

  cy.get('#box')
    .should('be.visible')
    .should('have.css', 'display', 'table')
})
