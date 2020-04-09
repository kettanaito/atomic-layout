import { query } from './query'

describe('query', () => {
  describe('given an exact breakpoint (for)', () => {
    let result: ReturnType<typeof query>

    beforeAll(() => {
      result = query({ for: 'md' })
    })

    it('should return an enclosed media query for the given breakpoint', () => {
      expect(result).toEqual('(min-width:768px) and (max-width:991px)')
    })
  })

  describe('given a high-pass breakpoint range (from)', () => {
    let result: ReturnType<typeof query>

    beforeAll(() => {
      result = query({ from: 'md' })
    })

    it('should return an enclosed media query for the given range', () => {
      expect(result).toEqual('(min-width:768px)')
    })
  })

  describe('given a low-pass breakpoint range (to)', () => {
    let result: ReturnType<typeof query>

    beforeAll(() => {
      result = query({ to: 'lg' })
    })

    it('should return an enclosed media query for the given range', () => {
      expect(result).toEqual('(max-width:991px)')
    })
  })

  describe('given a bell breakpoint range (from/to)', () => {
    let result: ReturnType<typeof query>

    beforeAll(() => {
      result = query({ from: 'sm', to: 'lg' })
    })

    it('should return an enclosed media query for the given range', () => {
      expect(result).toEqual(
        '(min-width:576px) and (max-width:calc(992px - 1px))',
      )
    })
  })

  describe('given a notch breakpoint range (except/from/to)', () => {
    let result: ReturnType<typeof query>

    beforeAll(() => {
      result = query({ except: true, from: 'sm', to: 'lg' })
    })

    it('should return an enclosed media query for the given range', () => {
      expect(result).toEqual('(max-width:575px),(min-width:992px)')
    })
  })
})
