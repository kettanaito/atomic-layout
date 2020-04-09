import { getBreakpointsByQuery } from './getBreakpointsByQuery'

describe('getBreakpointsByQuery', () => {
  describe('given an exact breakpoint (for)', () => {
    let result: ReturnType<typeof getBreakpointsByQuery>

    beforeAll(() => {
      result = getBreakpointsByQuery({ for: 'md' })
    })

    it('should return a single enclosed breakpoint', () => {
      expect(result).toEqual([
        {
          minWidth: '768px',
          maxWidth: '991px',
        },
      ])
    })
  })

  describe('given a high-pass breakpoint range (from)', () => {
    let result: ReturnType<typeof getBreakpointsByQuery>

    beforeAll(() => {
      result = getBreakpointsByQuery({ from: 'sm' })
    })

    it('should return breakpoints for that high-pass range', () => {
      expect(result).toEqual([
        {
          minWidth: '576px',
        },
      ])
    })
  })

  describe('given a low-pass breakpoint range (to)', () => {
    let result: ReturnType<typeof getBreakpointsByQuery>

    beforeAll(() => {
      result = getBreakpointsByQuery({ to: 'md' })
    })

    it('should return breakpoints for that low-pass range', () => {
      expect(result).toEqual([
        {
          maxWidth: '767px',
        },
      ])
    })
  })

  describe.only('given a bell breakpoint range (from/to)', () => {
    let result: ReturnType<typeof getBreakpointsByQuery>

    beforeAll(() => {
      result = getBreakpointsByQuery({ from: 'sm', to: 'lg' })
    })

    it('should return breakpoints for that inclusive range', () => {
      expect(result).toEqual([
        {
          minWidth: '576px',
          maxWidth: 'calc(992px - 1px)',
        },
      ])
    })
  })

  describe('given a notch breakpoint range (except/from/to)', () => {
    let result: ReturnType<typeof getBreakpointsByQuery>

    beforeAll(() => {
      result = getBreakpointsByQuery({ except: true, from: 'sm', to: 'lg' })
    })

    it('should return breakpoints for that exclusive range', () => {
      expect(result).toEqual([
        {
          maxWidth: '575px',
        },
        {
          maxWidth: undefined,
          minWidth: '992px',
        },
      ])
    })
  })
})
