describe('Polymorphic prop', () => {
  before(() => {
    cy.loadStory(['core'], ['rendering', 'polymorphic-prop'])
  })

  it('Renders <div> by default', () => {
    cy.get('#default').haveTag('div')
  })

  it('Renders polymorphic prop', () => {
    cy.get('#main').haveTag('main')
    cy.get('#footer').haveTag('footer')
  })

  describe('When using custom React component', () => {
    it('renders custom React component', () => {
      cy.get('#header').haveTag('header')
    })

    it('preserves irrelevant styles', () => {
      cy.get('#header').should(
        'have.css',
        'background-color',
        'rgb(238, 238, 238)',
      )
    })

    it('overrides layout styles', () => {
      cy.get('#header')
        .should('have.css', 'display', 'flex')
        .should('have.css', 'padding', '20px')
    })
  })
})
