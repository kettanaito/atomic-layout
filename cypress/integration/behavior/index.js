describe('Behavior', () => {
  beforeEach(() => {
    cy.setBreakpoint('xs')
  })

  require('./mobile-first.test')
  require('./inclusive.test')
  require('./bell.test')
})
