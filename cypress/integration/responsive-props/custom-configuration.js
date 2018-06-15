describe('Custom configuration', () => {
  before(() => {
    cy.visit('/responsive-props/custom-configuration')
  })
  afterEach(() => {
    cy.setBreakpoint('xs')
  })

  it('Supports custom measurement unit', () => {
    const assertPadding = (values) => {
      return cy.get('#composition').should('have.css', 'padding', values)
    }

    assertPadding('16px')
    cy.setBreakpoint('sm').then(() => assertPadding('32px'))
    cy.setBreakpoint('md').then(() => assertPadding('3rem'))
    cy.setBreakpoint('lg').then(() => assertPadding('4rem'))
    cy.setBreakpoint('xl').then(() => assertPadding('5rem'))
  })

  // it('Supports custom breakpoints', () => {})
})
