import getAreaBreakpoints from './getAreaBreakpoints'

test('Returns proper areas list with incompatible breakpoints', () => {
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
