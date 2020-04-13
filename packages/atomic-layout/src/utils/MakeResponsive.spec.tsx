/**
 * @jest-environment node
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { makeResponsive } from './makeResponsive'

const Component = makeResponsive((props) => {
  return <img {...props} />
})

describe('makeResponsive', () => {
  describe('given rendered on a server', () => {
    let html: ReturnType<typeof renderToString>

    beforeAll(() => {
      html = renderToString(
        <Component src="image.png" altMd="Image" titleLgDown="Title" />,
      )
    })

    it('should have responsive prop with default breakpoint', () => {
      expect(html).toContain('src="image.png"')
    })

    it.skip('should have responsive prop with "down" behavior', () => {
      expect(html).toContain('title="Title"')
    })

    it('should not have any responsive prop with other breakpoints', () => {
      expect(html).not.toContain('alt')
    })
  })
})
