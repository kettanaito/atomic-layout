it('Bell & Notch', () => {
  cy.loadStory(
    ['components', 'composition', 'rendering', 'responsive-props'],
    ['inclusive-notch'],
  )

  const assertPadding = (selector, values) => {
    return cy.get(selector).should('have.css', 'padding', values)
  }

  assertPadding('#composition-one', '10px')
  cy.setBreakpoint('sm').then(() => assertPadding('#composition-one', '20px'))
  cy.setBreakpoint('md').then(() => assertPadding('#composition-one', '20px'))
  cy.setBreakpoint('lg').then(() => assertPadding('#composition-one', '20px'))
  cy.setBreakpoint('xl').then(() => assertPadding('#composition-one', '10px'))

  assertPadding('#composition-two', '10px')
  cy.setBreakpoint('sm').then(() => assertPadding('#composition-two', '10px'))
  cy.setBreakpoint('md').then(() => assertPadding('#composition-two', '20px'))
  cy.setBreakpoint('lg').then(() => assertPadding('#composition-two', '10px'))
  cy.setBreakpoint('xl').then(() => assertPadding('#composition-two', '10px'))
})
