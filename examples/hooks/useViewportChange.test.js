describe('useViewportChange', () => {
  before(() => {
    cy.loadStory(['hooks'], ['useviewportchange'])
  })

  const element = () => cy.get('#element')

  it('Renders with the correct initial state', () => {
    element().should('not.be.visible')
  })

  it('Does not render at unmatching viewport', () => {
    cy.setBreakpoint('sm').then(() => element().should('not.be.visible'))
    cy.setBreakpoint('md').then(() => element().should('not.be.visible'))
  })

  it('Renders when the viewport matches', () => {
    cy.setBreakpoint('lg').then(() => element().should('be.visible'))
    cy.setBreakpoint('xl').then(() => element().should('be.visible'))
  })

  it('Does not render when returned to non-matching viewport', () => {
    cy.setBreakpoint('sm').then(() => element().should('not.be.visible'))
    cy.setBreakpoint('md').then(() => element().should('not.be.visible'))
  })
})
