const { expect } = require('chai')

describe('Template period', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'declaration'],
      ['template-period'],
    )
  })

  it('Renders named areas according to the template string', () => {
    cy.get('#left')
      .should('be.visible')
      .haveArea('left')
      .notIntersectWith('#right')
    cy.get('#right')
      .should('be.visible')
      .haveArea('right')
  })

  it('Renders dot (".") placeholder where specified', () => {
    cy.get('#left').then((leftAreaWrapper) => {
      cy.get('#right').then((rightAreaWrapper) => {
        const [leftArea] = leftAreaWrapper
        const [rightArea] = rightAreaWrapper

        expect(rightArea.offsetLeft).to.be.gt(
          leftArea.clientLeft + leftArea.offsetWidth + 20,
        )
      })
    })
  })
})
