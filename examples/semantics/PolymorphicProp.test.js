describe('Polymorphic prop', () => {
  before(() => {
    cy.loadStory(['semantics'], ['polymorphic-prop'])
  })

  it('Renders "div" by default', () => {
    cy.get('#default').haveTag('div')
  })

  describe('When given a tag name string', () => {
    it('Renders the given tag', () => {
      cy.get('#main').haveTag('main')
      cy.get('#footer').haveTag('footer')
    })
  })

  describe('When given a custom React component', () => {
    it('Renders a custom React component', () => {
      cy.get('#header').haveTag('header')
    })

    it('Preserves irrelevant styles', () => {
      cy.get('#header').should(
        'have.css',
        'background-color',
        'rgb(238, 238, 238)',
      )
    })

    it('Overrides layout styles', () => {
      cy.get('#header')
        .should('have.css', 'display', 'block')
        .should('have.css', 'padding', '20px')
    })
  })
})
