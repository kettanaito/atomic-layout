import assertNotch from '../../asserts/assertNotch'

it('Notch', () => {
  cy.loadStory(['core'], ['rendering', 'notch'])

  assertNotch()
})
