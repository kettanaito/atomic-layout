describe('useResponsiveProps', () => {
  before(() => {
    cy.loadStory(['hooks'], ['useresponsiveprops'])
  })

  beforeEach(() => {
    cy.setBreakpoint('xs')
  })

  const hasSize = (size) => {
    return cy
      .get('#avatar')
      .should('have.css', 'height', `${size}px`)
      .should('have.css', 'width', `${size}px`)
  }

  const hasFontSize = (size) => {
    return cy.get('#element').should('have.css', 'font-size', `${size}px`)
  }

  const hasBadge = (visible = true) => {
    return cy.get('#badge').should(visible ? 'be.visible' : 'not.be.visible')
  }

  it('High-pass', () => {
    hasSize(50)
    cy.setBreakpoint('sm').then(() => hasSize(50))
    cy.setBreakpoint('md').then(() => hasSize(75))
    cy.setBreakpoint('lg').then(() => hasSize(100))
    cy.setBreakpoint('xl').then(() => hasSize(100))
  })

  it('Bell', () => {
    hasFontSize(16)
    cy.setBreakpoint('sm').then(() => hasFontSize(20))
    cy.setBreakpoint('md').then(() => hasFontSize(20))
    cy.setBreakpoint('lg').then(() => hasFontSize(16))
    cy.setBreakpoint('xl').then(() => hasFontSize(16))
  })

  it('Notch', () => {
    hasBadge()
    cy.setBreakpoint('sm').then(() => hasBadge())
    cy.setBreakpoint('md').then(() => hasBadge())
    cy.setBreakpoint('lg').then(() => hasBadge(false))
    cy.setBreakpoint('xl').then(() => hasBadge(false))
  })
})
