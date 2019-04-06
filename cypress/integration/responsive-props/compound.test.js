it('Compound', () => {
  cy.loadStory(['core'], ['responsive-props', 'compound'])

  const assertTemplateCols = (value) => {
    return cy
      .get('#composition')
      .should('have.css', 'grid-template-columns', value)
  }

  assertTemplateCols('200px')
  cy.setBreakpoint('sm').then(() => assertTemplateCols('100px'))
  cy.setBreakpoint('md').then(() => assertTemplateCols('200px'))
  cy.setBreakpoint('lg').then(() => assertTemplateCols('200px'))
  cy.setBreakpoint('xl').then(() => assertTemplateCols('200px'))
})
