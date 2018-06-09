describe('Behavior', () => {
  beforeEach(() => {
    cy.setBreakpoint('xs')
  })

  require('./mobile-first')
  require('./inclusive')
  require('./bell')
})
