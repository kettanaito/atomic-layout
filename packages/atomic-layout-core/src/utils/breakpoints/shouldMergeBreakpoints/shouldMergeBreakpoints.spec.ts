import shouldMergeBreakpoints from './shouldMergeBreakpoints'

describe('shouldMergeBreakpoints', () => {
  it('returns "true" for combinable breakpoints', () => {
    expect(
      shouldMergeBreakpoints(
        {
          maxWidth: 576,
        },
        {
          minWidth: 580,
          maxWidth: 750,
        },
      ),
    ).toBe(true)

    expect(
      shouldMergeBreakpoints(
        {
          minResolution: '70dpi',
        },
        {
          minResolution: '320dpi',
        },
      ),
    ).toBe(true)

    expect(
      shouldMergeBreakpoints(
        {
          height: 200,
        },
        {
          height: 500,
        },
      ),
    ).toBe(true)

    expect(
      shouldMergeBreakpoints(
        {
          minAspectRatio: '3/4',
        },
        {
          minAspectRatio: '3/4',
          maxAspectRatio: '16/9',
        },
      ),
    ).toBe(true)
  })

  it('returns "false" for non-combinable breakpoints', () => {
    expect(
      shouldMergeBreakpoints(
        {
          maxWidth: 500,
        },
        {
          width: 600,
        },
      ),
    ).toBe(false)

    expect(
      shouldMergeBreakpoints(
        {
          resolution: '300dpi',
        },
        {
          maxResolution: '300dpi',
        },
      ),
    ).toBe(false)
  })

  it('accounts property names with equal length', () => {
    expect(
      shouldMergeBreakpoints(
        {
          minFooBar: 1,
        },
        {
          minFooBar: 2,
          maxDoeBar: 3,
        },
      ),
    ).toBe(false)
  })
})
