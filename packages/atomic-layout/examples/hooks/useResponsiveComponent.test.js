describe('useResponsiveComponent', () => {
  before(() => {
    cy.loadStory(['hooks'], ['useresponsivecomponent'])
  })

  describe('Prmiary behavior', () => {
    it('Custom responsive prop has correct initial state', () => {
      cy.get('#text')
        .should('have.css', 'font-size', '16px')
        .should('have.css', 'color', 'rgb(0, 0, 0)')
    })

    it('Custom responsive prop changes correctly on breakpoint changes', () => {
      cy.setBreakpoint('sm').then(() => {
        cy.get('#text')
          .should('have.css', 'font-size', '16px')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
      })

      cy.setBreakpoint('md').then(() => {
        cy.get('#text')
          .should('have.css', 'font-size', '20px')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
      })

      cy.setBreakpoint('lg').then(() => {
        cy.get('#text')
          .should('have.css', 'font-size', '24px')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })

      cy.setBreakpoint('xl').then(() => {
        cy.get('#text')
          .should('have.css', 'font-size', '24px')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })

  describe('Generic behavior', () => {
    it('Supports ref forwarding', () => {
      cy.get('#ref').should('have.text', '#text')
    })

    it('Re-renders on props change', () => {
      cy.setBreakpoint('lg')
      cy.get('#change-color').click()
      cy.get('#text').should('have.css', 'color', 'rgb(238, 130, 238)')

      // Test that the updated value persists after breakpoint change.
      // This ensures that "useResponsiveProps" handles both direct
      // and responsive props updates.
      cy.setBreakpoint('md')
      cy.setBreakpoint('lg')
      cy.get('#text').should('have.css', 'color', 'rgb(238, 130, 238)')
    })
  })
})
