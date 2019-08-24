import { assertNotch } from '../components/Composition/rendering/behaviors/Notch.test'

it('Supports custom measurement unit', () => {
  cy.loadStory(['configuration', 'custom-configuration'], ['custom-unit'])

  assertNotch()
})
