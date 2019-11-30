import pop from '../pop'

describe('pop', () => {
  describe('given an empty array', () => {
    const array: any[] = []
    let result: string[]

    beforeAll(() => {
      result = pop(array)
    })

    it('should return a new empty array', () => {
      expect(result).toEqual([])
    })

    it('should not mutate the original array', () => {
      expect(array).toEqual([])
    })
  })

  describe('given an array with a single member', () => {
    const array = ['area']
    let result: string[]

    beforeAll(() => {
      result = pop(array)
    })

    it('should return a new array with the last member removed', () => {
      expect(result).toEqual([])
    })

    it('should not mutate the original array', () => {
      expect(array).toEqual(['area'])
    })
  })

  describe('given an array with multiple members', () => {
    const array = [1, 2, 3]
    let result: number[]

    beforeAll(() => {
      result = pop<number>(array)
    })

    it('should return a new array with the last member removed', () => {
      expect(result).toEqual([1, 2])
    })

    it('should not mutate the original array', () => {
      expect(array).toEqual([1, 2, 3])
    })
  })
})
