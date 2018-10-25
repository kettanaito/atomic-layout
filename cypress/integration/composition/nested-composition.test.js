import assertNotch from '../../asserts/assertNotch'
import assertInclusive from '../../asserts/assertInclusive'

describe('Nested composition', () => {
  before(() => {
    cy.visit('/composition/nested-composition')
  })

  it('Composition component behaves as Inclusive', assertNotch)
  it('Composite component behaves as Notch', assertInclusive)
})
