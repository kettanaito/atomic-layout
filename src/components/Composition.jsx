import React from 'react'
import styled from 'styled-components'
import applyStyles from '../utils/applyStyles'
import parseTemplates from '../utils/parseTemplates'

const CompositionWrapper = styled.div`
  ${(props) => applyStyles(props)};
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
`

export default class Composition extends React.Component {
  constructor(props) {
    super(props)

    // This won't support value updates of "template" props
    this.areaComponents = parseTemplates(props)
  }

  render() {
    return (
      <CompositionWrapper {...this.props}>
        {this.props.children(this.areaComponents)}
      </CompositionWrapper>
    )
  }
}
