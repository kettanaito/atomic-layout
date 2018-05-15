import React from 'react'
import styled from 'styled-components'
import parseTemplate from './parseTemplate'
import applyStyles from './applyStyles'

const LayoutWrapper = styled.div`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  ${(props) => applyStyles(props)};
`

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.layoutAreas = parseTemplate(props.template)
  }

  render() {
    const { children } = this.props

    return (
      <LayoutWrapper {...this.props}>
        {children(this.layoutAreas)}
      </LayoutWrapper>
    )
  }
}
