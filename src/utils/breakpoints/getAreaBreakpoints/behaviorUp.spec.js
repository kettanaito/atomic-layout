import getAreaBreakpoints from './getAreaBreakpoints'

test('Up behavior', () => {
  /* min/maxHeight */
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

  /* min/maxResolution */
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

  /* min/maxAspectRation */
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

test('Stretching behavior', () => {
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
