describe('Visible', () => {
  before(() => {
    cy.loadStory(['components', 'only'], ['default-behavior'])
  })

  it('Displays children at the exact breakpoint (for)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#first').should('not.be.visible')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#first').should('be.visible')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#first').should('not.be.visible')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#first').should('not.be.visible')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#first').should('not.be.visible')
    })
  })

  it('Displays children up to a given breakpoint (to)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#second').should('be.visible')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#second').should('be.visible')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#second').should('not.be.visible')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#second').should('not.be.visible')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#second').should('not.be.visible')
    })
  })

  it('Displays children from a given breakpoint (from)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#third').should('not.be.visible')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#third').should('not.be.visible')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#third').should('not.be.visible')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#third').should('be.visible')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#third').should('be.visible')
    })
  })

  it('Displays children within a breakpoint range (from/to)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#fourth').should('not.be.visible')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#fourth').should('be.visible')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#fourth').should('be.visible')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#fourth').should('not.be.visible')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#fourth').should('not.be.visible')
    })
  })

  it('Displays children excluding a breakpoint range (except)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#fifth').should('be.visible')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#fifth').should('be.visible')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#fifth').should('not.be.visible')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#fifth').should('be.visible')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#fifth').should('be.visible')
    })
  })
})
