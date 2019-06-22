import { assertNotch } from '../rendering/notch.test'

it('Supports custom measurement unit', () => {
  cy.loadStory(['core'], ['configuration', 'custom-unit'])

  assertNotch()
})
