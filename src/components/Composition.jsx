import React from 'react'
import styled from 'styled-components'
import parseTemplates from '../utils/templates/parseTemplates'
import applyStyles from '../utils/styles/applyStyles'
import invariant from '../utils/invariant'

const CompositionWrapper = styled.div`
  ${applyStyles};
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
`

export default class Composition extends React.Component {
  constructor(props) {
    super(props)
    this.areaComponents = parseTemplates(props)
  }

  render() {
    const { areaComponents } = this
    const hasAreaComponents = Object.keys(areaComponents).length > 0

    invariant(
      hasAreaComponents,
      'Failed to render Composition: received no layout areas. Please check the values of template definitions.',
    )

    return (
      <CompositionWrapper {...this.props}>
        {hasAreaComponents && this.props.children(areaComponents)}
      </CompositionWrapper>
    )
  }
}
