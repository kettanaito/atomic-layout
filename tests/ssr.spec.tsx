/**
 * @jest-environment node
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Box, Only, Composition } from '../src'

test('Renders server-side without crashing', () => {
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
