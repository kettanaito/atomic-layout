describe('Display names', () => {
  before(() => {
    cy.loadStory(['regression', 'all'], ['display-names'])
  })

  it('Box should have a meaningful display name', () => {
    cy.get('#box').should('have.text', 'Box')
  })

  it('Composition should have meaningful display name', () => {
    cy.get('#composition').should(
      'have.attr',
      'data-display-name',
      'Composition',
    )
  })

  it('Composition areas should have meaningful display name', () => {
    cy.get('#composition-area').should('have.text', 'Area(One)')
  })

  it('Only should have meaningful display name', () => {
    cy.get('#only').should('have.text', 'Only')
  })

  it('Visible should have meaningful display name', () => {
    cy.get('#visible').should('have.text', 'Visible')
  })
})
