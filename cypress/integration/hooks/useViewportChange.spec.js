describe('useViewportChange', () => {
  before(() => {
    cy.loadStory(null, ['hooks', 'useviewportchange'])
  })

  const element = () => cy.get('#element')

  it('renders initially', () => {
    element().should('not.be.visible')
  })

  it('does not render at unmatching viewport', () => {
    cy.setBreakpoint('sm').then(() => element().should('not.be.visible'))
    cy.setBreakpoint('md').then(() => element().should('not.be.visible'))
  })

  it('renders when viewport matches', () => {
    cy.setBreakpoint('lg').then(() => element().should('be.visible'))
    cy.setBreakpoint('xl').then(() => element().should('be.visible'))
  })

  it('does not render when back at unmatching viewport', () => {
    cy.setBreakpoint('sm').then(() => element().should('not.be.visible'))
    cy.setBreakpoint('md').then(() => element().should('not.be.visible'))
  })
})
