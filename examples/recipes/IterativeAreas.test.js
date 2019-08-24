describe('Iterative areas', function() {
  before(() => {
    cy.loadStory(['recipes', 'all'], ['iterative-areas'])
  })

  describe('Iterative columns', function() {
    it('Renders without crashing', () => {
      cy.get('#composition-one').should('be.visible')
      cy.get('#abc').should('be.visible')
      cy.get('#def').should('be.visible')
      cy.get('#ghi').should('be.visible')
    })

    it('Respects col="auto" on dynamic area', () => {
      cy.get('#abc')
        .should('have.css', 'grid-column', 'auto / auto')
        .should('have.css', 'grid-row', 'singleArea / singleArea')
        .notIntersectWith('#def')
        .notIntersectWith('#ghi')

      cy.get('#def')
        .should('have.css', 'grid-column', 'auto / auto')
        .should('have.css', 'grid-row', 'singleArea / singleArea')
        .notIntersectWith('#abc')
        .notIntersectWith('#ghi')

      cy.get('#ghi')
        .should('have.css', 'grid-column', 'auto / auto')
        .should('have.css', 'grid-row', 'singleArea / singleArea')
        .notIntersectWith('#abc')
        .notIntersectWith('#def')
    })
  })

  describe('Iterative rows', function() {
    it('Renders without crashing', () => {
      cy.get('#composition-two').should('be.visible')
      cy.get('#123').should('be.visible')
      cy.get('#456').should('be.visible')
      cy.get('#789').should('be.visible')
    })

    it('Respects row="auto" on dynamic area', () => {
      cy.get('#123')
        .should('have.css', 'grid-column', 'singleArea / singleArea')
        .should('have.css', 'grid-row', 'auto / auto')
        .notIntersectWith('#456')
        .notIntersectWith('#789')

      cy.get('#456')
        .should('have.css', 'grid-column', 'singleArea / singleArea')
        .should('have.css', 'grid-row', 'auto / auto')
        .notIntersectWith('#123')
        .notIntersectWith('#789')

      cy.get('#789')
        .should('have.css', 'grid-column', 'singleArea / singleArea')
        .should('have.css', 'grid-row', 'auto / auto')
        .notIntersectWith('#123')
        .notIntersectWith('#456')
    })
  })
})
