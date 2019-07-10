import { testCases } from '.'

describe('Custom unit', () => {
  before(() => {
    cy.loadStory(['components'], ['only', 'custom-default-unit'])
  })

  testCases()
})
