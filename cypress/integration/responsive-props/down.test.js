describe('Behavior: "down"', () => {
  before(() => {
    cy.loadStory(['core'], ['responsive-props', 'down'])
  })

  it('with multiple "down" props', () => {
    const assertPadding = (values) => {
      return cy.get('#composition-down').should('have.css', 'padding', values)
    }

    assertPadding('10px')
    cy.setBreakpoint('sm').then(() => assertPadding('20px'))
    cy.setBreakpoint('md').then(() => assertPadding('30px'))
    cy.setBreakpoint('lg').then(() => assertPadding('40px'))
    cy.setBreakpoint('xl').then(() => assertPadding('50px'))
  })

  it('when combined with "up" sibling', () => {
    const assertTemplateCols = (value) => {
      return cy
        .get('#composition-combination')
        .should('have.css', 'grid-template-columns', value)
    }

    assertTemplateCols('200px')
    cy.setBreakpoint('sm').then(() => assertTemplateCols('100px'))
    cy.setBreakpoint('md').then(() => assertTemplateCols('200px'))
    cy.setBreakpoint('lg').then(() => assertTemplateCols('200px'))
    cy.setBreakpoint('xl').then(() => assertTemplateCols('200px'))
  })
})
