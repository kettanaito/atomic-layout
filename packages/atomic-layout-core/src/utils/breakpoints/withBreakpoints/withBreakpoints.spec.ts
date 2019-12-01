import './matchMedia.mock'
import withBreakpoints from './withBreakpoints'

describe('withBreakpoints', () => {
  describe('given existing breakpoints', () => {
    it('should return value associated with matching breakpoint', () => {
      expect(
        withBreakpoints({
          xs: 'extra small',
          md: 'medium',
          lg: 'large',
        }),
      ).toEqual('large')
    })

    it('should return the default value when no breakpoints match', () => {
      expect(
        withBreakpoints(
          {
            md: 'medium',
          },
          'default',
        ),
      ).toEqual('default')
    })

    it('should return "undefined" when not given default value', () => {
      expect(
        withBreakpoints({
          md: 'medium',
        }),
      ).toBeUndefined()
    })
  })

  describe('given non-existing breakpoints', () => {
    it('should print console warning', () => {
      const consoleSpy = jest.spyOn(console, 'warn')
      withBreakpoints({
        foo: 'bar',
      })
      expect(console.warn).toHaveBeenCalledTimes(1)
      consoleSpy.mockRestore()
    })

    it('should return default value when given', () => {
      expect(
        withBreakpoints(
          {
            foo: 'bar',
          },
          'default',
        ),
      ).toEqual('default')
    })

    it('should return "undefined" when not given default value', () => {
      expect(
        withBreakpoints({
          foo: 'bar',
        }),
      ).toBeUndefined()
    })
  })
})
