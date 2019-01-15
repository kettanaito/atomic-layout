import * as React from 'react'
import styled from 'styled-components'
import { GenericProps, GridProps } from '../const/props'
import { AreasMap } from '../utils/templates/generateComponents'
import parseTemplates from '../utils/templates/parseTemplates'
import applyStyles from '../utils/styles/applyStyles'

type ChildrenFunction = (areas: AreasMap) => React.ReactNode

interface CompositionProps extends GenericProps, GridProps {
  [propName: string]: any
  children: ChildrenFunction | React.ReactNode
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
      {hasAreaComponents
        ? (children as ChildrenFunction)(areaComponents)
        : children}
    </CompositionWrapper>
  )
}

export default Composition
