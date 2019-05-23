describe('Supports custom prop aliases', () => {
  cy.loadStory(['core'], ['configuration', 'custom-prop-aliases'])

  it('Prop alias with transform', () => {
    cy.get('#box-one').should('have.css', 'text-align', 'center')
  })

  it('Prop alias with "transformNumeric"', () => {
    cy.get('#box-two').should('have.css', 'font-size', '32px')
    cy.get('#box-three').should('have.css', 'font-size', '20px')
  })

  it('Prop alias with custom value transformer', () => {
    //
  })
})
