describe('useResponsiveValue', () => {
  before(() => {
    cy.loadStory(null, ['hooks', 'useresponsivevalue'])
  })

  const assertText = (value) => {
    return cy.get('#element').should('have.text', value)
  }

  it('resolves to specified value', () => {
    assertText('xs')
    cy.setBreakpoint('md').then(() => assertText('md'))
    cy.setBreakpoint('lg').then(() => assertText('lg'))
  })

  it('resolves to default value, when no match', () => {
    cy.setBreakpoint('sm').then(() => assertText('default'))
    cy.setBreakpoint('xl').then(() => assertText('default'))
  })
})
