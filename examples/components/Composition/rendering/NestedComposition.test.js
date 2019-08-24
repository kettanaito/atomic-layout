import { assertBell } from './behaviors/Bell.test'
import { assertNotch } from './behaviors/Notch.test'

describe('Nested composition', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'rendering'],
      ['nested-composition'],
    )
  })

  it('Parent composition behaves as bell', assertNotch)
  it('Child composite behaves as notch', assertBell)
})
