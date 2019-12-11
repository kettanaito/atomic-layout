describe('Default behavior', () => {
  before(() => {
    cy.loadStory(['components', 'only'], ['default-behavior'])
  })

  it('Renders children at the exact breakpoint (for)', () => {
    cy.setBreakpoint('xs').then(() => cy.shouldRender('#first', false))
    cy.setBreakpoint('sm').then(() => cy.shouldRender('#first'))
    cy.setBreakpoint('md').then(() => cy.shouldRender('#first', false))
    cy.setBreakpoint('lg').then(() => cy.shouldRender('#first', false))
    cy.setBreakpoint('xl').then(() => cy.shouldRender('#first', false))
  })

  it('Renders children up to a given breakpoint (to)', () => {
    cy.setBreakpoint('xs').then(() => cy.shouldRender('#second'))
    cy.setBreakpoint('sm').then(() => cy.shouldRender('#second'))
    cy.setBreakpoint('md').then(() => cy.shouldRender('#second', false))
    cy.setBreakpoint('lg').then(() => cy.shouldRender('#second', false))
    cy.setBreakpoint('xl').then(() => cy.shouldRender('#second', false))
  })

  it('Renders children from a given breakpoint (from)', () => {
    cy.setBreakpoint('xs').then(() => cy.shouldRender('#third', false))
    cy.setBreakpoint('sm').then(() => cy.shouldRender('#third', false))
    cy.setBreakpoint('md').then(() => cy.shouldRender('#third', false))
    cy.setBreakpoint('lg').then(() => cy.shouldRender('#third'))
    cy.setBreakpoint('xl').then(() => cy.shouldRender('#third'))
  })

  it('Renders children within a breakpoint range (from/to)', () => {
    cy.setBreakpoint('xs').then(() => cy.shouldRender('#fourth', false))
    cy.setBreakpoint('sm').then(() => cy.shouldRender('#fourth'))
    cy.setBreakpoint('md').then(() => cy.shouldRender('#fourth'))
    cy.setBreakpoint('lg').then(() => cy.shouldRender('#fourth', false))
    cy.setBreakpoint('xl').then(() => cy.shouldRender('#fourth', false))
  })

  it('Renders children excluding a breakpoint range (except)', () => {
    cy.setBreakpoint('xs').then(() => cy.shouldRender('#fifth'))
    cy.setBreakpoint('sm').then(() => cy.shouldRender('#fifth'))
    cy.setBreakpoint('md').then(() => cy.shouldRender('#fifth', false))
    cy.setBreakpoint('lg').then(() => cy.shouldRender('#fifth'))
    cy.setBreakpoint('xl').then(() => cy.shouldRender('#fifth'))
  })
})
