import { testCases } from '.'

describe('Default breakpoints', () => {
  before(() => {
    cy.visit('/only')
  })

  testCases()
})
