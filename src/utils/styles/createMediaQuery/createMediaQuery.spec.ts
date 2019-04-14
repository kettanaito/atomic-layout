import createMediaQuery from './createMediaQuery'

describe('createMediaQuery', () => {
  it('when given breakpoint with "up" behavior', () => {
    const mediaQuery = createMediaQuery(
      {
        minWidth: 100,
        maxWidth: 200,
        minAspectRatio: '72dpi',
      },
      'up',
    )

    expect(mediaQuery).toEqual('(min-width:100px) and (min-aspect-ratio:72dpi)')
  })

  it('when given breakpoint with "down" behavior', () => {
    const mediaQuery = createMediaQuery(
      {
        minWidth: 100,
        maxWidth: 200,
        minResolution: '300dpi',
      },
      'down',
    )

    expect(mediaQuery).toEqual('(max-width:200px) and (min-resolution:300dpi)')
  })

  it('when given breakpoint with "only" behavior', () => {
    const mediaQuery = createMediaQuery(
      {
        minWidth: 100,
        maxWidth: 200,
        orientation: 'landscape',
      },
      'only',
    )

    expect(mediaQuery).toEqual(
      '(min-width:100px) and (max-width:200px) and (orientation:landscape)',
    )
  })
})
