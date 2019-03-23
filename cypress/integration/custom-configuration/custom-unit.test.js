import assertNotch from '../../asserts/assertNotch'

it('Supports custom measurement unit', () => {
  cy.loadStory(['core'], ['configuration', 'custom-unit'])

  assertNotch()
})
