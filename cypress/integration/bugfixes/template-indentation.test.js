it('Supports unindented template strings', () => {
  cy.loadStory(['bugfixes'], ['all', 'template-indentation'])

  cy.get('#first')
    .should('be.visible')
    .haveArea('first')
    .notIntersectWith('#second')

  cy.get('#second')
    .should('be.visible')
    .haveArea('second')
})
