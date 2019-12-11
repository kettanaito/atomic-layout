describe('Supports custom breakpoints', () => {
  before(() => {
    cy.loadStory(['components', 'only'], ['custom-breakpoints'])
  })

  it('Renders children at the exact breakpoint (for)', () => {
    cy.setBreakpoint({ minWidth: 500 }).then(() => cy.shouldRender('#first'))
    cy.setBreakpoint({ minWidth: 601 }).then(() =>
      cy.shouldRender('#first', false),
    )
    cy.setBreakpoint({ minWidth: 701 }).then(() =>
      cy.shouldRender('#first', false),
    )
    cy.setBreakpoint({ minWidth: 801 }).then(() =>
      cy.shouldRender('#first', false),
    )
  })

  it('Renders children up to a given breakpoint (to)', () => {
    cy.setBreakpoint({ minWidth: 500 }).then(() => cy.shouldRender('#second'))
    cy.setBreakpoint({ minWidth: 601 }).then(() => cy.shouldRender('#second'))
    cy.setBreakpoint({ minWidth: 701 }).then(() =>
      cy.shouldRender('#second', false),
    )
    cy.setBreakpoint({ minWidth: 801 }).then(() =>
      cy.shouldRender('#second', false),
    )
  })

  it('Renders children from a given breakpoint (from)', () => {
    cy.setBreakpoint({ minWidth: 500 }).then(() =>
      cy.shouldRender('#third', false),
    )
    cy.setBreakpoint({ minWidth: 601 }).then(() =>
      cy.shouldRender('#third', false),
    )
    cy.setBreakpoint({ minWidth: 701 }).then(() => cy.shouldRender('#third'))
    cy.setBreakpoint({ minWidth: 801 }).then(() => cy.shouldRender('#third'))
  })

  it('Renders children within a breakpoint range (from/to)', () => {
    cy.setBreakpoint({ minWidth: 500 }).then(() =>
      cy.shouldRender('#fourth', false),
    )
    cy.setBreakpoint({ minWidth: 601 }).then(() => cy.shouldRender('#fourth'))
    cy.setBreakpoint({ minWidth: 701 }).then(() => cy.shouldRender('#fourth'))
    cy.setBreakpoint({ minWidth: 801 }).then(() =>
      cy.shouldRender('#fourth', false),
    )
  })

  it('Renders children excluding a breakpoint range (except)', () => {
    cy.setBreakpoint({ minWidth: 500 }).then(() => cy.shouldRender('#fifth'))
    cy.setBreakpoint({ minWidth: 601 }).then(() =>
      cy.shouldRender('#fifth', false),
    )
    cy.setBreakpoint({ minWidth: 701 }).then(() =>
      cy.shouldRender('#fifth', false),
    )
    cy.setBreakpoint({ minWidth: 801 }).then(() => cy.shouldRender('#fifth'))
  })
})
