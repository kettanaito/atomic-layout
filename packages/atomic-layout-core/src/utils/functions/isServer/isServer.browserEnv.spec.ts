import isServer from './isServer'

describe('isServer', () => {
  describe('@browser environment', () => {
    it('should return false', () => {
      expect(isServer()).toBe(false)
    })
  })
})
