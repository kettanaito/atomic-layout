import React from 'react'
import { render } from '@testing-library/react'
import '../../atomic-layout-core/src/utils/breakpoints/withBreakpoints/matchMedia.mock'
import {
  Box as DefaultBox,
  Composition as DefaultComposition,
  Only as DefaultOnly,
  Visible as DefaultVisible,
} from '../src/'

interface ComponentsMap {
  Box: typeof DefaultBox
  Composition: typeof DefaultComposition
  Only: typeof DefaultOnly
  Visible: typeof DefaultVisible
}

export const createForwardRefTest = (components: ComponentsMap) => {
  const { Box, Composition, Only, Visible } = components

  describe('Refs', () => {
    it('Supports ref forwarding for the "Box" component', () => {
      const ref = React.createRef()
      render(<Box ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('Supports ref forwarding for the "Composition" component', () => {
      const ref = React.createRef()
      render(
        <Composition ref={ref} as="span">
          <p>Arbitrary content</p>
        </Composition>,
      )
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })

    it('Supports ref forwarding for the generated Area components', () => {
      const leftRef = React.createRef()
      const rightRef = React.createRef()
      render(
        <Composition areas="left right">
          {(Areas) => (
            <>
              <Areas.Left ref={leftRef}>Left</Areas.Left>
              <Areas.Right ref={rightRef} as="span">
                Right
              </Areas.Right>
            </>
          )}
        </Composition>,
      )
      expect(leftRef.current).toBeInstanceOf(HTMLDivElement)
      expect(rightRef.current).toBeInstanceOf(HTMLSpanElement)
    })

    it('Supports ref forwarding for the "Only" component', () => {
      const ref = React.createRef()
      render(<Only ref={ref} from="md" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('Supports ref forwarding for the "Visible" component', () => {
      const ref = React.createRef()
      render(<Visible ref={ref} as="span" from="md" />)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })
}
