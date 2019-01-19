import { testCases } from '.'

describe('Custom breakpoints', () => {
  before(() => {
    cy.visit('/only/custom')
  })

  testCases()
})
