describe('Namespace collision', () => {
  before(() => {
    cy.loadStory(['components'], ['composition', 'namespace'])
  })

  it('Renders children without crashing', () => {
    cy.get('#composition').assertAreas([['logo', 'menu']])
  })

  it('Renders custom components without collision', () => {
    cy.get('[data-area="logo"]').should('have.text', 'Logo')
    cy.get('[data-area="menu"]').should('have.text', 'Menu')
  })
})
