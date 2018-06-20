import assertBell from '../../asserts/assertBell'
import assertInclusive from '../../asserts/assertInclusive'

describe('Nested composition', () => {
  before(() => {
    cy.visit('/composition/nested-composition')
  })

  it('Composition component behaves as Inclusive', assertBell)
  it('Composite component behaves as Bell', assertInclusive)
})
