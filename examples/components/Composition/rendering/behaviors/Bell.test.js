it('Bell', () => {
  cy.loadStory(
    ['components', 'composition', 'rendering', 'behaviors'],
    ['bell'],
  )

  cy.get('#bell').assertBell()
})
