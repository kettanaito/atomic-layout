import { expect } from 'chai'
import createMediaQuery from './createMediaQuery'

test('', () => {
  const mediaQuery = createMediaQuery({
    minWidth: 100,
    maxWidth: 200,
    minResolution: '72dpi',
  })

  expect(mediaQuery).to.equal(
    '(min-width:100) and (max-width:200) and (min-resolution:72dpi)',
  )
})
