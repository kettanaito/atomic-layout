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
    cy.setBreakpoint('md').then(() => {
      cy.get('#header').notIntersectWith('#content')
    })
  })

  describe('row', () => {
    it('Supports exact row height', () => {
      cy.get('#header').should('have.css', 'height', '100px')
      cy.setBreakpoint('md').then(() => {
        cy.get('#header').should('have.css', 'height', '500px')
        cy.get('#content').should('have.css', 'height', '500px')
      })
    })

    it('Supports dynamic row height', () => {
      cy.get('#content').should('have.css', 'height', '60px')
    })
  })

  describe('column', () => {
    it('Supports exact column width', () => {
      cy.setBreakpoint('md').then(() => {
        cy.get('#header').should('have.css', 'width', '200px')
      })
    })

    it('Supports dynamic column width', () => {
      cy.setBreakpoint('md').then(() => {
        cy.get('#composition').then(([parent]) => {
          const { clientWidth: parentWidth } = parent
          const { header, content } = parent.children
          const { clientWidth: contentWidth } = content

          expect(contentWidth).to.equal(parentWidth - header.clientWidth - 10)
        })
      })
    })
  })
})
