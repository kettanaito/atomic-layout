describe('Visible', () => {
  before(() => {
    cy.loadStory(['components', 'visible'], ['default-behavior'])
  })

  it('Displays children at the exact breakpoint (for)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#first').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#first').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#first').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#first').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#first').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })
  })

  it('Displays children up to a given breakpoint (to)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#second').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#second').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#second').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#second').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#second').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })
  })

  it('Displays children from a given breakpoint (from)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#third').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#third').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#third').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#third').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#third').should('be.visible').should('not.have.attr', 'aria-hidden')
    })
  })

  it('Displays children within a breakpoint range (from/to)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#fourth').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#fourth').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#fourth').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#fourth').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#fourth').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })
  })

  it('Displays children excluding a breakpoint range (except)', () => {
    cy.setBreakpoint('xs').then(() => {
      cy.get('#fifth').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('sm').then(() => {
      cy.get('#fifth').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('md').then(() => {
      cy.get('#fifth').should('not.be.visible').should('have.attr', 'aria-hidden', 'true')
    })

    cy.setBreakpoint('lg').then(() => {
      cy.get('#fifth').should('be.visible').should('not.have.attr', 'aria-hidden')
    })

    cy.setBreakpoint('xl').then(() => {
      cy.get('#fifth').should('be.visible').should('not.have.attr', 'aria-hidden')
    })
  })
})
