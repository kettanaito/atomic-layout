it('Omits style props with "undefined" value', () => {
  cy.loadStory(['bugfixes'], ['all', 'styles-undefined'])

  cy.get('#composition')
    .should('be.visible')
    .should('have.css', 'padding-right', '12px')
    .should('not.have.css', 'gutter')
})
