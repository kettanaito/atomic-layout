import assertBell from '../../asserts/assertBell'

it('Bell', () => {
  cy.loadStory(['core'], ['rendering', 'bell'])

  assertBell()
})
