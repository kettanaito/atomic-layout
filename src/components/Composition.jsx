import React from 'react'
import styled from 'styled-components'
import parseTemplates from '../utils/templates/parseTemplates'
import applyStyles from '../utils/styles/applyStyles'

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
    const { children } = this.props
    const hasAreaComponents = Object.keys(areaComponents).length > 0

    return (
      <CompositionWrapper {...this.props}>
        {hasAreaComponents ? children(areaComponents) : children}
      </CompositionWrapper>
    )
  }
}
