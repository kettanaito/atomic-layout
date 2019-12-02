it('Omits style props with "undefined" value', () => {
  cy.loadStory(['regression', 'all'], ['styles-undefined'])

  cy.get('#composition')
    .should('be.visible')
    .should('have.css', 'padding-right', '12px')
    .should('not.have.css', 'gutter')
})
