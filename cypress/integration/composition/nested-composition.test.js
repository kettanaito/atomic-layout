import assertNotch from '../../asserts/assertNotch'
import assertInclusive from '../../asserts/assertInclusive'

describe('Nested composition', () => {
  before(() => {
    cy.loadStory(['components'], ['composition', 'nested-composition'])
  })

  it('Composition behaves as Inclusive', assertNotch)
  it('Composite behaves as Notch', assertInclusive)
})
