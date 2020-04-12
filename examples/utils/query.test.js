describe('query()', () => {
  before(() => {
    cy.loadStory(['utilities'], ['query'])
  })

  const assertCss = (propertyName, value) => {
    return cy
      .get('[data-test-id="component"]')
      .should('have.css', propertyName, value)
  }

  it('Supports an exact breakpoint (for)', () => {
    cy.setBreakpoint('xs').then(() => assertCss('color', 'rgb(0, 0, 0)'))
    cy.setBreakpoint('sm').then(() => assertCss('color', 'rgb(0, 255, 255)'))
    cy.setBreakpoint('md').then(() => assertCss('color', 'rgb(0, 0, 0)'))
    cy.setBreakpoint('lg').then(() => assertCss('color', 'rgb(0, 0, 0)'))
    cy.setBreakpoint('xl').then(() => assertCss('color', 'rgb(0, 0, 0)'))
  })

  it('Supports a high-pass breakpoint range (from)', () => {
    cy.setBreakpoint('xs').then(() =>
      assertCss('background-color', 'rgba(0, 0, 0, 0)'),
    )
    cy.setBreakpoint('sm').then(() =>
      assertCss('background-color', 'rgba(0, 0, 0, 0)'),
    )
    cy.setBreakpoint('md').then(() =>
      assertCss('background-color', 'rgb(224, 255, 255)'),
    )
    cy.setBreakpoint('lg').then(() =>
      assertCss('background-color', 'rgb(224, 255, 255)'),
    )
    cy.setBreakpoint('xl').then(() =>
      assertCss('background-color', 'rgb(224, 255, 255)'),
    )
  })

  it('Supports a low-pass breakpoint range (to)', () => {
    cy.setBreakpoint('xs').then(() => assertCss('padding', '10px'))
    cy.setBreakpoint('sm').then(() => assertCss('padding', '0px'))
    cy.setBreakpoint('md').then(() => assertCss('padding', '0px'))
    cy.setBreakpoint('lg').then(() => assertCss('padding', '0px'))
    cy.setBreakpoint('xl').then(() => assertCss('padding', '0px'))
  })

  it('Supports a bell breakpoint range (from/to)', () => {
    cy.setBreakpoint('xs').then(() => assertCss('margin', '0px'))
    cy.setBreakpoint('sm').then(() => assertCss('margin', '0px'))
    cy.setBreakpoint('md').then(() => assertCss('margin', '20px'))
    cy.setBreakpoint('lg').then(() => assertCss('margin', '20px'))
    cy.setBreakpoint('xl').then(() => assertCss('margin', '0px'))
  })

  it('Supports a notch breakpoint range (except/from/to)', () => {
    cy.setBreakpoint('xs').then(() => assertCss('font-size', '18px'))
    cy.setBreakpoint('sm').then(() => assertCss('font-size', '18px'))
    cy.setBreakpoint('md').then(() => assertCss('font-size', '14px'))
    cy.setBreakpoint('lg').then(() => assertCss('font-size', '18px'))
    cy.setBreakpoint('xl').then(() => assertCss('font-size', '18px'))
  })
})
