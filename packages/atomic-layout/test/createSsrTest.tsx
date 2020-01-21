import React from 'react'
import { renderToString } from 'react-dom/server'

/**
 * Creates a SSR unit test scenario with the given built module.
 */
export const createSsrTest = (
  getModule: () => Promise<typeof import('../src/index')>,
): void => {
  describe('Server-side rendering', () => {
    let library: typeof import('../src/index')

    beforeAll(async () => {
      library = await getModule()
    })

    it('rendering on a server without crashing', () => {
      const { Box, Only, Composition } = library

      const renderOnServer = () =>
        renderToString(
          <main>
            <Box padding={10} />
            <Only for="md">Responsive content</Only>
            <Composition areas="first second">
              {({ First, Second }: any) => (
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
  })
}
