import pop from './index'

describe('pop', () => {
  it('removes the last entry of an array', () => {
    expect(pop([1, 2, 3])).toEqual([1, 2])
    expect(pop([1, 2])).toEqual([1])
    expect(pop([1])).toEqual([])
  })

  it('does not mutate original array', () => {
    const arr = [1, 2]
    pop(arr)
    expect(arr).toEqual([1, 2])
  })
})
