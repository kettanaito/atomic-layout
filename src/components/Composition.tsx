import React from 'react'
import styled from 'styled-components'
import { ComponentsMap } from '../utils/templates/generateComponents'
import parseTemplates from '../utils/templates/parseTemplates'
import applyStyles from '../utils/styles/applyStyles'

interface CompositionProps {
  children: (areas: ComponentsMap) => React.ReactChildren | React.ReactChildren
  inline?: boolean
}

const CompositionWrapper = styled.div<CompositionProps>`
  ${applyStyles};
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
`

const Composition: React.FunctionComponent<CompositionProps> = ({
  children,
  ...restProps
}) => {
  const areaComponents = parseTemplates(restProps)
  const hasAreaComponents = Object.keys(areaComponents).length > 0

  return (
    <CompositionWrapper {...restProps}>
      {hasAreaComponents ? children(areaComponents) : children}
    </CompositionWrapper>
  )
}

export default Composition
