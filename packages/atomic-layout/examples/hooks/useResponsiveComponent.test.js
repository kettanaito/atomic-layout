describe('useResponsiveComponent', () => {
  before(() => {
    cy.loadStory(['hooks'], ['useresponsivecomponent'])
  })

  describe('Prmiary behavior', () => {
    it('custom responsive prop has correct initial state', () => {
      cy.get('#text')
        .should('have.css', 'font-size', '16px')
        .should('have.css', 'color', 'rgb(0, 0, 0)')
    })

    it('custom responsive prop changes correctly on breakpoint changes', () => {
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
    it('supports ref forwarding', () => {
      cy.get('#ref').should('have.text', '#text')
    })
  })
})
