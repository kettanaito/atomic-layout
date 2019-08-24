describe('useResponsiveValue', () => {
  before(() => {
    cy.loadStory(['hooks'], ['useresponsivevalue'])
  })

  const assertText = (value) => {
    return cy.get('#element').should('have.text', value)
  }

  it('Resolves to a value associated with a breakpoint', () => {
    assertText('xs')
    cy.setBreakpoint('md').then(() => assertText('md'))
    cy.setBreakpoint('lg').then(() => assertText('lg'))
  })

  it('Fallbacks to the default value when no breakpoint association found', () => {
    cy.setBreakpoint('sm').then(() => assertText('default'))
    cy.setBreakpoint('xl').then(() => assertText('default'))
  })
})
