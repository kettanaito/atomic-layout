import * as React from 'react'
import styled from 'styled-components'
import { GenericProps, GridProps } from '@const/props'
import { AreasMap } from '@utils/templates/generateComponents'
import parseTemplates from '@utils/templates/parseTemplates'
import applyStyles from '@utils/styles/applyStyles'
import warn from '@utils/functions/warn'

type ChildrenFunction = (areas: AreasMap) => React.ReactNode

interface CompositionProps extends GenericProps, GridProps {
  [propName: string]: any
  children: ChildrenFunction | React.ReactNode
  inline?: boolean
}

const CompositionWrapper = styled.div<CompositionProps>`
  && {
    ${applyStyles};
    display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  }
`

const Composition: React.FunctionComponent<CompositionProps> = ({
  children,
  ...restProps
}) => {
  const areaComponents = parseTemplates(restProps)
  const hasAreaComponents = Object.keys(areaComponents).length > 0
  const childrenType = typeof children
  const hasChildrenFunction = childrenType === 'function'

  // Warn on attempt to use "areas"/"template" props without children-as-function.
  // Render in that case still occurs, but it doesn't produce the expected result.
  warn(
    !(hasAreaComponents && !hasChildrenFunction),
    `Failed to render 'Composition' with template areas ["${Object.keys(
      areaComponents,
    ).join(
      '", "',
    )}"]: expected children to be a function, but got: ${childrenType}. Please provide render function as children, or remove assigned template props.`,
  )

  return (
    <CompositionWrapper {...restProps}>
      {hasAreaComponents && hasChildrenFunction
        ? (children as ChildrenFunction)(areaComponents)
        : children}
    </CompositionWrapper>
  )
}

export default Composition
