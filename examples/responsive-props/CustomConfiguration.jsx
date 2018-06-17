import React from 'react'
import Layout, { Composition } from '@lib'
import Square from '../../stories/Square'

Layout.configure({
  defaultUnit: 'rem',
  defaultBreakpointName: 'mobile',
  breakpoints: {
    mobile: {
      maxWidth: '575px',
    },
    tablet: {
      minWidth: '576px',
      maxWidth: '768px',
    },
    desktop: {
      minWidth: '769px',
    },
  },
})

const template = `
  'first'
  'second'
`

const CustomConfiguration = () => (
  <Composition id="composition" template={template} padding={1}>
    {({ First, Second }) => (
      <React.Fragment>
        <First>
          <Square>First</Square>
        </First>
        <Second>
          <Square>Second</Square>
        </Second>
      </React.Fragment>
    )}
  </Composition>
)

export default CustomConfiguration
