import React from 'react'
import styled from 'styled-components'
import Box from './Box'
import parseTemplates from '../utils/templates/parseTemplates'

const CompositionWrapper = styled(Box)`
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
