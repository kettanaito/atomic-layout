describe('Single responsive prop', () => {
  before(() => {
    cy.loadStory(['regression', 'all'], ['single-responsive-prop'])
  })

  describe('Given "up" behavior', () => {
    it('Renders no areas on unmatched breakpoints', () => {
      const shouldRenderNothing = () => {
        cy.get('[data-area="left"]').should('not.be.visible')
        cy.get('[data-area="right"]').should('not.be.visible')
      }

      cy.setBreakpoint('xs').then(shouldRenderNothing)
      cy.setBreakpoint('sm').then(shouldRenderNothing)
    })

    it('Renders areas on matched breakpoint and up', () => {
      const shouldRenderAreas = () => {
        cy.get('#composition').assertAreas([['left', 'right']])
      }

      cy.setBreakpoint('md').then(shouldRenderAreas)
      cy.setBreakpoint('lg').then(shouldRenderAreas)
      cy.setBreakpoint('xl').then(shouldRenderAreas)
    })
  })

  describe('Given "down" behavior', () => {
    it('Has no padding on unmatched breakpoints', () => {
      const shouldHaveNoPadding = () => {
        cy.get('#composition').should('have.css', 'padding', '0px')
      }

      cy.setBreakpoint('lg').then(shouldHaveNoPadding)
      cy.setBreakpoint('xl').then(shouldHaveNoPadding)
    })

    it('Has padding on matched breakpoints', () => {
      const shouldHavePadding = () => {
        cy.get('#composition').should('have.css', 'padding', '15px')
      }

      cy.setBreakpoint('xs').then(shouldHavePadding)
      cy.setBreakpoint('sm').then(shouldHavePadding)
      cy.setBreakpoint('md').then(shouldHavePadding)
    })
  })

  describe('Given "only" behavior', () => {
    it('Has no gap on unmatched breakpoints', () => {
      const shouldHaveNoGap = () => {
        cy.get('#composition').should('have.css', 'grid-gap', 'normal normal')
      }

      cy.setBreakpoint('xs').then(shouldHaveNoGap)
      cy.setBreakpoint('sm').then(shouldHaveNoGap)
      cy.setBreakpoint('md').then(shouldHaveNoGap)
    })

    it('Has a gap on a matched breakpoint', () => {
      const shouldHaveGap = () => {
        cy.get('#composition').should('have.css', 'grid-gap', '10px 10px')
      }

      cy.setBreakpoint('lg').then(shouldHaveGap)
    })
  })
})
