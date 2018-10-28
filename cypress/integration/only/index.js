describe('Only', () => {
  before(() => {
    cy.visit('/only/example')
  })

  it('Renders children at explicit breakpoint (for)', () => {
    const shouldRender = () => cy.get('#first').should('be.visible')
    const shouldNotRender = () => cy.get('#first').should('not.be.visible')

    cy.setBreakpoint('xs').then(shouldNotRender)
    cy.setBreakpoint('sm').then(shouldRender)
    cy.setBreakpoint('md').then(shouldNotRender)
    cy.setBreakpoint('lg').then(shouldNotRender)
    cy.setBreakpoint('xl').then(shouldNotRender)
  })

  it('Renders children to a breakpoint (to)', () => {
    const shouldRender = () => cy.get('#second').should('be.visible')
    const shouldNotRender = () => cy.get('#second').should('not.be.visible')

    cy.setBreakpoint('xs').then(shouldRender)
    cy.setBreakpoint('sm').then(shouldRender)
    cy.setBreakpoint('md').then(shouldNotRender)
    cy.setBreakpoint('lg').then(shouldNotRender)
    cy.setBreakpoint('xl').then(shouldNotRender)
  })

  it('Renders children from a breakpoint (from)', () => {
    const shouldRender = () => cy.get('#third').should('be.visible')
    const shouldNotRender = () => cy.get('#third').should('not.be.visible')

    cy.setBreakpoint('xs').then(shouldNotRender)
    cy.setBreakpoint('sm').then(shouldNotRender)
    cy.setBreakpoint('md').then(shouldNotRender)
    cy.setBreakpoint('lg').then(shouldRender)
    cy.setBreakpoint('xl').then(shouldRender)
  })
})
