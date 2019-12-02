describe('Template-less composition', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'declaration'],
      ['template-less-composition'],
    )
  })

  it('Renders children without crashing', () => {
    cy.get('#first').should('have.css', 'width', '200px')
    cy.get('#second').should('have.css', 'width', '300px')
    cy.get('#third').should('have.css', 'width', '400px')
  })
})
