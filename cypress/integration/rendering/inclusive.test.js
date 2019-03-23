import assertInclusive from '../../asserts/assertInclusive'

it('Inclusive', () => {
  cy.loadStory(['core'], ['rendering', 'inclusive'])

  assertInclusive()
})
