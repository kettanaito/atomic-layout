import React from 'react'
import styled from 'styled-components'
import parseTemplates from '../utils/parseTemplates'
import applyStyles from '../utils/applyStyles'
import getPropByName from '../utils/getPropByName'

const CompositionWrapper = styled.div`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  ${(props) => applyStyles(props)};
`

export default class Composition extends React.Component {
  constructor(props) {
    super(props)

    const templates = getPropByName('template', props)

    // This won't support value updates of "template" props
    this.areaComponents = parseTemplates(templates)
  }

  render() {
    return (
      <CompositionWrapper {...this.props}>
        {this.props.children(this.areaComponents)}
      </CompositionWrapper>
    )
  }
}
