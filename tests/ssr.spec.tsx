/**
 * @jest-environment node
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Box, Only, Composition } from '../src'

describe('Server-side rendering', () => {
  test('renders without crashing', () => {
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

  /**
   * @todo Include generated HTML string assertions?
   */
})
