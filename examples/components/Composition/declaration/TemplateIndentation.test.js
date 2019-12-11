describe('Template string indentation', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'declaration'],
      ['template-indentation'],
    )
  })

  it('Supports unindented template string', () => {
    cy.get('#first')
      .should('be.visible')
      .haveArea('first')
      .notIntersectWith('#second')

    cy.get('#second')
      .should('be.visible')
      .haveArea('second')
  })

  it('Supports mis-indented template string', () => {
    cy.get('#third')
      .should('be.visible')
      .haveArea('third')
      .notIntersectWith('#fourth')

    cy.get('#fourth')
      .should('be.visible')
      .haveArea('fourth')
  })
})
