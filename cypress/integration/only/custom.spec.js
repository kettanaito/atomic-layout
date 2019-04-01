import { testCases } from '.'

describe('Custom breakpoints', () => {
  before(() => {
    cy.loadStory(['components'], ['only', 'custom-breakpoint'])
  })

  testCases()
})
