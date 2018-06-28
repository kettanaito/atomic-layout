import { expect } from 'chai'
import shouldCombineBreakpoints from './shouldCombineBreakpoints'

test('Returns "true" for combinable breakpoints', () => {
  expect(
    shouldCombineBreakpoints(
      {
        maxWidth: 576,
      },
      {
        minWidth: 580,
        maxWidth: 750,
      },
    ),
  ).to.be.true

  expect(
    shouldCombineBreakpoints(
      {
        minResolution: '70dpi',
      },
      {
        minResolution: '320dpi',
      },
    ),
  ).to.be.true

  expect(
    shouldCombineBreakpoints(
      {
        height: 200,
      },
      {
        height: 500,
      },
    ),
  ).to.be.true

  expect(
    shouldCombineBreakpoints(
      {
        minAspectRatio: '3/4',
      },
      {
        minAspectRatio: '3/4',
        maxAspectRatio: '16/9',
      },
    ),
  )
})

test('Returns "false" for non-combinable breakpoints', () => {
  expect(
    shouldCombineBreakpoints(
      {
        maxWidth: 500,
      },
      {
        width: 600,
      },
    ),
  ).to.be.false

  expect(
    shouldCombineBreakpoints(
      {
        resolution: '300dpi',
      },
      {
        maxResolution: '300dpi',
      },
    ),
  ).to.be.false

  /* Ensure equal-length params are not considered falsely positive */
  expect(
    shouldCombineBreakpoints(
      {
        minFooBar: 1,
      },
      {
        minFooBar: 2,
        maxDoeBar: 3,
      },
    ),
  ).to.be.false
})
