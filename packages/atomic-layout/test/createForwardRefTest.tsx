import React from 'react'
import '../../atomic-layout-core/src/utils/breakpoints/withBreakpoints/matchMedia.mock'
import { render } from '@testing-library/react'

interface ComponentsMap {
  Box: any
  Composition: any
  Only: any
  Visible: any
}

export const createForwardRefTest = (components: ComponentsMap) => {
  const { Box, Composition, Only, Visible } = components

  describe('Refs', () => {
    it('Box', () => {
      const ref = React.createRef()
      render(<Box ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('Composition', () => {
      const ref = React.createRef()
      render(<Composition ref={ref} as="span" />)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })

    it('Only', () => {
      const ref = React.createRef()
      render(<Only ref={ref} from="md" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('Visible', () => {
      const ref = React.createRef()
      render(<Visible ref={ref} as="span" from="md" />)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })
}
