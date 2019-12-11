describe('useBreakpointChange', () => {
  before(() => {
    cy.loadStory(['hooks'], ['usebreakpointchange'])
  })

  const assertText = (value) => {
    return cy.get('#element').should('have.text', value)
  }

  it('Renders with the correct initial state', () => {
    assertText('default')
  })

  it('Sets breakpoint name on breakpoint change', () => {
    cy.setBreakpoint('sm').then(() => {
      assertText('sm')
    })
  })

  it('Ignores resize within the same breakpoint', () => {
    cy.viewport(580, 700).then(() => {
      assertText('sm')
    })

    cy.viewport(600, 700).then(() => {
      assertText('sm')
    })
  })

  it('Re-renders on breakpoint change', () => {
    cy.setBreakpoint('md').then(() => {
      assertText('md')
    })
  })
})
