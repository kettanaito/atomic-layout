/**
 * @jest-environment node
 */
import isServer from './isServer'

describe('isServer', () => {
  describe('@jest-environment node', () => {
    it('should return true', () => {
      expect(isServer()).toBe(true)
    })
  })
})
