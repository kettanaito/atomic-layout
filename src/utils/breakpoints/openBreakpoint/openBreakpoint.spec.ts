import openBreakpoint from './openBreakpoint'

test('Sets the value of "max" properties of the given breakpoint to "undefined"', () => {
  expect(
    openBreakpoint({
      behavior: 'up',
      maxWidth: 500,
      maxHeight: 400,
      maxResolution: '300dpi',
      maxAspectRatio: '1/3',
    }),
  ).toEqual({
    maxWidth: undefined,
    maxHeight: undefined,
    maxResolution: undefined,
    maxAspectRatio: undefined,
  })
})
