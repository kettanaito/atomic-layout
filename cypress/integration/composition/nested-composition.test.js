import assertNotch from '../../asserts/assertNotch'
import assertBell from '../../asserts/assertBell'

describe('Nested composition', () => {
  before(() => {
    cy.loadStory(['components'], ['composition', 'nested-composition'])
  })

  it('Composition behaves as Bell', assertNotch)
  it('Composite behaves as Notch', assertBell)
})
