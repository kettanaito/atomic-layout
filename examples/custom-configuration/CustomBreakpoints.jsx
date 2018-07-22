import React from 'react'
import Layout, { Composition } from 'atomic-layout'
import Square from '../../stories/Square'

const template = `
  'first'
  'second'
`

export default class CustomBreakpoints extends React.Component {
  componentWillMount() {
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
  }

  render() {
    return (
      <Composition
        id="composition"
        template={template}
        gutter={1}
        padding={1}
        paddingTablet={2}
        paddingDesktop={3}
      >
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
  }
}
