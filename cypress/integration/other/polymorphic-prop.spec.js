describe('Polymorphic prop', () => {
  before(() => {
    cy.visit('/other/polymorphic-prop')
  })

  it('Renders <div> by default', () => {
    cy.get('#default').haveTag('div')
  })

  it('Renders polymorphic prop', () => {
    cy.get('#header').haveTag('header')
    cy.get('#main').haveTag('main')
    cy.get('#footer').haveTag('footer')
  })
})
