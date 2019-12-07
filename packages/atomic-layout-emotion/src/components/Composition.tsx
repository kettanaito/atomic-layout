import * as React from 'react'
import {
  AreaComponent,
  BoxProps,
  CompositionProps,
  CompositionRenderProp,
  applyStyles,
  parseTemplates,
  generateComponents,
} from '@atomic-layout/core'
import styled from '@emotion/styled'
import Box from './Box'
import { withPlaceholder } from '../../../atomic-layout/src/utils/withPlaceholder'

const CompositionWrapper = styled.div<CompositionProps>`
  && {
    ${applyStyles};
    display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  }
`

const createAreaComponent = (areaName: string): AreaComponent => (
  props: BoxProps,
) => <Box area={areaName} {...props} />

const Composition: React.FC<CompositionProps> = ({
  children,
  ...restProps
}) => {
  const areasList = parseTemplates(restProps)
  const Areas = generateComponents(
    areasList,
    createAreaComponent,
    withPlaceholder,
  )
  const hasAreaComponents = Object.keys(Areas).length > 0
  const childrenType = typeof children
  const hasRenderProp = childrenType === 'function'

  return (
    <CompositionWrapper {...restProps}>
      {hasAreaComponents && hasRenderProp
        ? (children as CompositionRenderProp)(Areas)
        : children}
    </CompositionWrapper>
  )
}

export default Composition
