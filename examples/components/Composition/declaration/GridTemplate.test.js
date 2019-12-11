const { expect } = require('chai')

describe('Grid template', function() {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'declaration'],
      ['grid-template-syntax'],
    )
  })

  beforeEach(() => {
    cy.setBreakpoint('xs')
  })

  it('Areas should not intersect', () => {
    cy.get('#header').notIntersectWith('#content')
    cy.get('#content').notIntersectWith('#footer')

    cy.setBreakpoint('md').then(() => {
      cy.get('#header').notIntersectWith('#content')
      cy.get('#content').notIntersectWith('#footer')
    })
  })

  describe('row', () => {
    it('Supports "auto" as the row height', () => {
      cy.get('#footer').should('have.css', 'height', '70px')
    })

    it('Supports exact row height', () => {
      cy.get('#header').should('have.css', 'height', '100px')

      cy.setBreakpoint('md').then(() => {
        cy.get('#header').should('have.css', 'height', '500px')
        cy.get('#content').should('have.css', 'height', '500px')
      })
    })

    it('Supports dynamic row height', () => {
      cy.get('#content').should('have.css', 'height', '40px')
    })
  })

  describe('column', () => {
    it('Supports "auto" as a column width', () => {
      cy.setBreakpoint('md').then(() => {
        cy.get('#footer').should('have.css', 'width', '50px')
      })
    })

    it('Supports exact column width', () => {
      cy.setBreakpoint('md').then(() => {
        cy.get('#header').should('have.css', 'width', '200px')
      })
    })

    it('Supports dynamic column width', () => {
      cy.setBreakpoint('md').then(() => {
        cy.get('#composition').then(([parent]) => {
          const { clientWidth: parentWidth } = parent
          const { header, content, footer } = parent.children
          const { clientWidth: headerWidth } = header
          const { clientWidth: contentWidth } = content
          const { clientWidth: footerWidth } = footer

          expect(contentWidth).to.equal(
            parentWidth - headerWidth - footerWidth - 10 * 2,
          )
        })
      })
    })
  })
})
