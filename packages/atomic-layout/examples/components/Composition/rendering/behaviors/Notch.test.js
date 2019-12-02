it('Notch', () => {
  cy.loadStory(
    ['components', 'composition', 'rendering', 'behaviors'],
    ['notch'],
  )

  cy.get('#notch').assertNotch()
})
