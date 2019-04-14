import getAreaBreakpoints from './getAreaBreakpoints'

describe('when handling "up" behavior', () => {
  it('always renders area with min/max height', () => {
    expect(
      getAreaBreakpoints('first', [
        {
          areas: ['first'],
          behavior: 'up',
          breakpoint: {
            maxHeight: 500,
          },
        },
        {
          areas: ['first', 'second'],
          behavior: 'up',
          breakpoint: {
            minHeight: 501,
          },
        },
      ]),
    ).toEqual([
      {
        behavior: 'up',
        minHeight: undefined,
        maxHeight: undefined,
      },
    ])
  })

  it('always render area with min/max resolution', () => {
    expect(
      getAreaBreakpoints('first', [
        {
          areas: ['first'],
          behavior: 'up',
          breakpoint: {
            maxResolution: '200dpi',
          },
        },
        {
          areas: ['first', 'second'],
          behavior: 'up',
          breakpoint: {
            minResolution: '300dpi',
          },
        },
      ]),
    ).toEqual([
      {
        behavior: 'up',
        minHeight: undefined,
        maxHeight: undefined,
      },
    ])
  })

  it('always renders area with min/max aspect ratios', () => {
    expect(
      getAreaBreakpoints('first', [
        {
          areas: ['first'],
          behavior: 'up',
          breakpoint: {
            maxAspectRatio: '3/4',
          },
        },
        {
          areas: ['first', 'second'],
          behavior: 'up',
          breakpoint: {
            minAspectRatio: '16/9',
          },
        },
      ]),
    ).toEqual([
      {
        behavior: 'up',
        minHeight: undefined,
        maxHeight: undefined,
      },
    ])
  })

  it('encloses "up" breakpoint with "max" media query property', () => {
    expect(
      getAreaBreakpoints('first', [
        {
          areas: ['first'],
          behavior: 'up',
          breakpoint: {
            maxHeight: 500,
          },
        },
        {
          areas: ['second'],
          behavior: 'up',
          breakpoint: {
            minHeight: 750,
          },
        },
      ]),
    ).toEqual([
      {
        behavior: 'down',
        minHeight: undefined,
        maxHeight: 'calc(750px - 1px)',
      },
      null,
    ])
  })
})
