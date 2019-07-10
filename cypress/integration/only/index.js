export const testCases = () => {
  const shouldRender = (selector) => () => cy.get(selector).should('be.visible')
  const shouldNotRender = (selector) => () =>
    cy.get(selector).should('not.be.visible')

  it('Renders children at the explicit breakpoint (for)', () => {
    cy.setBreakpoint('xs').then(shouldNotRender('#first'))
    cy.setBreakpoint('sm').then(shouldRender('#first'))
    cy.setBreakpoint('md').then(shouldNotRender('#first'))
    cy.setBreakpoint('lg').then(shouldNotRender('#first'))
    cy.setBreakpoint('xl').then(shouldNotRender('#first'))
  })

  it('Renders children up to a given breakpoint (to)', () => {
    cy.setBreakpoint('xs').then(shouldRender('#second'))
    cy.setBreakpoint('sm').then(shouldRender('#second'))
    cy.setBreakpoint('md').then(shouldNotRender('#second'))
    cy.setBreakpoint('lg').then(shouldNotRender('#second'))
    cy.setBreakpoint('xl').then(shouldNotRender('#second'))
  })

  it('Renders children starting from a given breakpoint (from)', () => {
    cy.setBreakpoint('xs').then(shouldNotRender('#third'))
    cy.setBreakpoint('sm').then(shouldNotRender('#third'))
    cy.setBreakpoint('md').then(shouldNotRender('#third'))
    cy.setBreakpoint('lg').then(shouldRender('#third'))
    cy.setBreakpoint('xl').then(shouldRender('#third'))
  })

  it('Supports inclusive (bell) behavior', () => {
    cy.setBreakpoint('xs').then(shouldNotRender('#fourth'))
    cy.setBreakpoint('sm').then(shouldRender('#fourth'))
    cy.setBreakpoint('md').then(shouldRender('#fourth'))
    cy.setBreakpoint('lg').then(shouldNotRender('#fourth'))
    cy.setBreakpoint('xl').then(shouldNotRender('#fourth'))
  })

  it('Supports exclusive (notch) behavior', () => {
    cy.setBreakpoint('xs').then(shouldRender('#fifth'))
    cy.setBreakpoint('sm').then(shouldRender('#fifth'))
    cy.setBreakpoint('md').then(shouldNotRender('#fifth'))
    cy.setBreakpoint('lg').then(shouldRender('#fifth'))
    cy.setBreakpoint('xl').then(shouldRender('#fifth'))
  })
}

describe('Only', () => {
  require('./default.spec')
  require('./custom-breakpoint.spec')
  require('./custom-unit.spec')
})
