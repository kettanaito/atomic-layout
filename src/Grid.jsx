import React from 'react'
import styled from 'styled-components'

import parseTemplate from './parseTemplate'
import applyStyles from './applyStyles'

const GridContainer = styled.div`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  ${(props) => applyStyles(props)};
`

GridContainer.displayName = 'withStyle(Grid)'

export default class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.gridAreas = parseTemplate(props.template)
  }

  render() {
    const { children } = this.props

    return (
      <GridContainer {...this.props}>{children(this.gridAreas)}</GridContainer>
    )
  }
}
