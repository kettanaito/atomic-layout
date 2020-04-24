describe('Parent re-rendering', () => {
  before(() => {
    cy.loadStory(['regression', 'all'], ['parent-re-rendering'])
  })

  it('Should preserve areas state when parent updates', () => {
    cy.get('input[name="username"]')
      .type('admin')
      .should('be.focused')
      .should('have.value', 'admin')
  })
})
