it('Supports custom measurement unit', () => {
  cy.loadStory(['configuration', 'custom-configuration'], ['custom-unit'])

  cy.get('#notch').assertNotch()
})
