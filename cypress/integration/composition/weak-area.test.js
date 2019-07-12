describe('Weak area rendering', () => {
  before(() => {
    cy.loadStory(['components'], ['composition', 'weak-area'])
  })

  describe('on extra-small screen', () => {
    before(() => {
      cy.setBreakpoint('sm')
    })

    it('Renders existing areas', () => {
      cy.get('#composition').assertAreas([['left', 'right']])
    })

    it('Does not render weak area', () => {
      cy.get('#center').should('not.exist')
    })

    it('Does not render undefined area', () => {
      cy.get('#extra').should('not.exist')
    })
  })

  describe('on medium screen', () => {
    before(() => {
      cy.setBreakpoint('md')
    })

    it('Renders all areas', () => {
      cy.get('#composition').assertAreas([['left', 'center', 'right']])
    })

    it('Does not render undefined area', () => {
      cy.get('#extra').should('not.exist')
    })
  })
})
