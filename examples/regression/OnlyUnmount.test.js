describe('Only unmount', () => {
  before(() => {
    cy.loadStory(['regression', 'all'], ['only-unmount'])
  })

  describe('given I clicked on increment counter', () => {
    before(() => {
      cy.get('#button-increment')
        .click()
        .click()
        .click()
    })

    it('should update the counter state', () => {
      cy.get('#count').should('have.text', '3')
    })

    it('should retain state when parent updates', () => {
      cy.get('#button-disable').click()
      cy.get('#count').should('have.text', '3')
    })
  })
})
