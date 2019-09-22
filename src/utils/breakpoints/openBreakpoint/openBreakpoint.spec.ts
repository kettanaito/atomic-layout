import { Breakpoint } from '../../../const/defaultOptions'
import openBreakpoint from './openBreakpoint'

describe('openBreakpoint', () => {
  describe('given already open breakpoint', () => {
    const breakpoint = {
      minHeight: 500,
    }

    it('should return breakpoint as-is', () => {
      expect(openBreakpoint(breakpoint)).toEqual({
        minHeight: 500,
      })
    })
  })

  describe('given a closed breakpoint', () => {
    const breakpoint = {
      maxWidth: 768,
    }

    it('should return an empty breakpoint', () => {
      expect(openBreakpoint(breakpoint)).toEqual({})
    })
  })

  describe('given an inclusive breakpoint', () => {
    let result: Breakpoint
    const breakpoint = {
      minResolution: '150dpi',
      maxResolution: '300dpi',
    }

    beforeAll(() => {
      result = openBreakpoint(breakpoint)
    })

    it('should set "maxResolution" to undefined', () => {
      expect(result).toHaveProperty('maxResolution', undefined)
    })

    it('should preserve "minResolution" value', () => {
      expect(result).toHaveProperty('minResolution', '150dpi')
    })
  })

  describe('given a complex breakpoint', () => {
    let result: Breakpoint
    const breakpoint = {
      minWidth: 300,
      maxWidth: 500,
      minHeight: 200,
      maxHeight: 400,
      minResolution: '150dpi',
      maxResolution: '300dpi',
      maxAspectRatio: '1/3',
    }

    beforeAll(() => {
      result = openBreakpoint(breakpoint)
    })

    it('should set all "max-" properties to undefined', () => {
      expect(result).toHaveProperty('maxWidth', undefined)
      expect(result).toHaveProperty('maxHeight', undefined)
      expect(result).toHaveProperty('maxResolution', undefined)
      expect(result).toHaveProperty('maxAspectRatio', undefined)
    })

    it('should preserve all "min-" properties', () => {
      expect(result).toHaveProperty('minWidth', 300)
      expect(result).toHaveProperty('minHeight', 200)
      expect(result).toHaveProperty('minResolution', '150dpi')
    })
  })
})
