import { testCases } from '.'

describe('Default breakpoints', () => {
  before(() => {
    cy.loadStory(['components'], ['only', 'default'])
  })

  testCases()
})
