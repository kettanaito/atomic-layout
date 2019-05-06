describe('useViewportChange', () => {
  before(() => {
    cy.loadStory(null, ['hooks', 'useviewportchange'])
  })

  const element = () => cy.get('#element')

  it('Renders initially', () => {
    element().should('not.be.visible')
  })

  it('Does not render at unmatching viewport', () => {
    cy.setBreakpoint('sm').then(() => element().should('not.be.visible'))
    cy.setBreakpoint('md').then(() => element().should('not.be.visible'))
  })

  it('Renders when viewport matches', () => {
    cy.setBreakpoint('lg').then(() => element().should('be.visible'))
    cy.setBreakpoint('xl').then(() => element().should('be.visible'))
  })

  it('Does not render when back at unmatching viewport', () => {
    cy.setBreakpoint('sm').then(() => element().should('not.be.visible'))
    cy.setBreakpoint('md').then(() => element().should('not.be.visible'))
  })
})
