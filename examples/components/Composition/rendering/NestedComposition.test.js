describe('Nested composition', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'rendering'],
      ['nested-composition'],
    )
  })

  it('Parent composition behaves as bell', () => {
    cy.get('#notch').assertNotch()
  })

  it('Child composite behaves as notch', () => {
    cy.get('#bell').assertBell()
  })
})
