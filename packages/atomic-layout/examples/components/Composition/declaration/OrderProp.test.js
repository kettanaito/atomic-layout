const { expect } = require('chai')

describe('Order prop', function() {
  before(() => {
    cy.loadStory(['components', 'composition', 'declaration'], ['order-prop'])
  })

  describe('given template-less composition', () => {
    it('should render the child with negative order first', () => {
      cy.get('#box-third').then(([thirdElement]) => {
        cy.get('#box-first').then(([firstElement]) => {
          expect(thirdElement.offsetTop).to.be.lessThan(firstElement.offsetTop)
        })
      })
    })

    it('should render other children as-is', () => {
      cy.get('#box-first').then(([firstElement]) => {
        cy.get('#box-second').then(([secondElement]) => {
          expect(firstElement.offsetTop).to.be.lessThan(secondElement.offsetTop)
        })
      })
    })
  })

  describe('given composition with a template', () => {
    it('should ignore the "order" prop on area component', () => {
      cy.get('[data-area="right"]').then(([rightElement]) => {
        cy.get('[data-area="left"]').then(([leftElement]) => {
          expect(rightElement.offsetLeft).to.be.greaterThan(
            leftElement.offsetLeft,
          )
        })
      })
    })

    it('should render areas according to the template', () => {
      cy.get('#regular-composition').assertAreas([['left', 'center', 'right']])
    })
  })
})
