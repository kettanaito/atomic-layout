import getAreaBreakpoints from './getAreaBreakpoints'

test('Returns proper areas for incompatible breakpoints', () => {
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
          minResolution: '200dpi',
        },
      },
    ]),
  ).toEqual([
    {
      behavior: 'up',
      minHeight: undefined,
      maxHeight: 500,
    },
    {
      behavior: 'up',
      minResolution: '200dpi',
      maxResolution: undefined,
    },
  ])
})

test('Stretches incompatible breakpoints properly', () => {
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
          minHeight: 650,
          maxHeight: 750,
        },
      },
      {
        areas: ['first', 'second'],
        behavior: 'up',
        breakpoint: {
          minResolution: '200dpi',
        },
      },
    ]),
  ).toEqual([
    {
      behavior: 'down',
      maxHeight: 'calc(650px - 1px)',
    },
    null,
    {
      behavior: 'up',
      minResolution: '200dpi',
    },
  ])
})
