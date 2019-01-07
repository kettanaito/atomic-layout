import React from 'react'
import styled from 'styled-components'
import parseTemplates from '../utils/templates/parseTemplates'
import applyStyles from '../utils/styles/applyStyles'

const CompositionWrapper = styled.div`
  ${applyStyles};
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
`

const Composition = ({ children, ...restProps }) => {
  const areaComponents = parseTemplates(restProps)
  const hasAreaComponents = Object.keys(areaComponents).length > 0

  return (
    <CompositionWrapper {...restProps}>
      {hasAreaComponents ? children(areaComponents) : children}
    </CompositionWrapper>
  )
}

export default Composition
