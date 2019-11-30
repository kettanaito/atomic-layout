import getAreaRecords from './getAreaRecords'

describe('when handling "up" behavior', () => {
  it('always renders area with min/max height', () => {
    expect(
      getAreaRecords('first', [
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
        breakpoint: {
          minHeight: undefined,
          maxHeight: undefined,
        },
      },
    ])
  })

  it('always renders area with min/max resolution', () => {
    expect(
      getAreaRecords('first', [
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
        breakpoint: {
          minHeight: undefined,
          maxHeight: undefined,
        },
      },
    ])
  })

  it('always renders area with min/max aspect ratios', () => {
    expect(
      getAreaRecords('first', [
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
        breakpoint: {
          minHeight: undefined,
          maxHeight: undefined,
        },
      },
    ])
  })

  it('encloses "up" breakpoint with "max" media query property', () => {
    expect(
      getAreaRecords('first', [
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
        breakpoint: {
          minHeight: undefined,
          maxHeight: 'calc(750px - 1px)',
        },
      },
      null,
    ])
  })
})
