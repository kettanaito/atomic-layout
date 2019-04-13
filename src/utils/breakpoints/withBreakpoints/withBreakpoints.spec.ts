import '@src/../tests/matchMedia.mock'
import withBreakpoints from './withBreakpoints'

describe('withBreakpoints', () => {
  describe('when given existing breakpoints', () => {
    it('returns value associated with matching breakpoint', () => {
      expect(
        withBreakpoints({
          xs: 'extra small',
          md: 'medium',
          lg: 'large',
        }),
      ).toEqual('large')
    })

    it('returns default value when no breakpoints match', () => {
      expect(
        withBreakpoints(
          {
            md: 'medium',
          },
          'default',
        ),
      ).toEqual('default')
    })

    it('returns "undefined" when not given default value', () => {
      expect(
        withBreakpoints({
          md: 'medium',
        }),
      ).toBeUndefined()
    })
  })

  describe('when given non-existing breakpoints', () => {
    it('prints console warning', () => {
      const consoleSpy = jest.spyOn(console, 'warn')
      withBreakpoints({
        foo: 'bar',
      })
      expect(console.warn).toHaveBeenCalledTimes(1)
      consoleSpy.mockRestore()
    })

    it('returns default value when given', () => {
      expect(
        withBreakpoints(
          {
            foo: 'bar',
          },
          'default',
        ),
      ).toEqual('default')
    })

    it('returns "undefined" when not given default value', () => {
      expect(
        withBreakpoints({
          foo: 'bar',
        }),
      ).toBeUndefined()
    })
  })
})
