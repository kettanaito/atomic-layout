/**
 * @jest-environment node
 */
import React from 'react'
import styled from 'styled-components'
import { renderToString } from 'react-dom/server'
import { Box, Only, Composition, useResponsiveComponent } from '../src'

describe('Server-side rendering', () => {
  it('renders on a server without crashing', () => {
    const renderOnServer = () =>
      renderToString(
        <main>
          <Box padding={10} />
          <Only for="md">Responsive content</Only>
          <Composition template="first second">
            {({ First, Second }) => (
              <>
                <First>First</First>
                <Second>Second</Second>
              </>
            )}
          </Composition>
        </main>,
      )

    expect(renderOnServer).not.toThrow()
  })

  it('renders with the src attribute', () => {
    const StyledImage = styled.img`
      border-radius: 5px;
    `
    const ElementImage = useResponsiveComponent(StyledImage)
    const ElementImageHtml = renderToString(<ElementImage src="foo.png" />)
    expect(ElementImageHtml).toContain('src="foo.png"')
  })
})
