describe('useBreakpointChange', () => {
  before(() => {
    cy.loadStory(['hooks'], ['usebreakpointchange'])
  })

  const assertText = (value) => {
    return cy.get('#element').should('have.text', value)
  }

  const assertCalledTimes = (times) => {
    return cy.get('#call-count').should('have.text', String(times))
  }

  it('Renders with the correct initial state', () => {
    assertText('default')
    assertCalledTimes(0)
  })

  it('Sets breakpoint name on breakpoint change', () => {
    cy.setBreakpoint('sm').then(() => {
      assertText('sm')
      assertCalledTimes(1)
    })
  })

  it('Ignores resize within the same breakpoint', () => {
    cy.viewport(580, 700).then(() => {
      assertText('sm')
      assertCalledTimes(1)
    })

    cy.viewport(600, 700).then(() => {
      assertText('sm')
      assertCalledTimes(1)
    })
  })

  it('Re-renders on breakpoint change', () => {
    cy.setBreakpoint('md').then(() => {
      assertText('md')
      assertCalledTimes(2)
    })
  })
})
