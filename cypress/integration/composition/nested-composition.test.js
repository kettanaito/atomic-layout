import { assertBell } from '../rendering/bell.test'
import { assertNotch } from '../rendering/notch.test'

describe('Nested composition', () => {
  before(() => {
    cy.loadStory(['components'], ['composition', 'nested-composition'])
  })

  it('Composition behaves as Bell', assertNotch)
  it('Composite behaves as Notch', assertBell)
})
