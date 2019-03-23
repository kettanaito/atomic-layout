import assertMobileFirst from '../../asserts/assertMobileFirst'

it('Mobile first', () => {
  cy.loadStory(['core'], ['rendering', 'mobile-first'])

  assertMobileFirst()
})
