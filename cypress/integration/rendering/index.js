describe('Rendering', () => {
  beforeEach(() => {
    /* Reset breakpoint to "xs" so each test starts from mobile */
    cy.setBreakpoint('xs')
  })

  require('./mobile-first.test')
  require('./bell.test')
  require('./notch.test')
})
