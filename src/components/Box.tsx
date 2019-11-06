import * as React from 'react'
import styled from 'styled-components'
import { GenericProps } from '@const/props'
import applyStyles from '@utils/styles/applyStyles'

export interface BoxProps extends GenericProps {
  [propName: string]: any
  flex?: boolean
  inline?: boolean
}

const Box: React.FC<BoxProps> = styled.div<BoxProps>`
  display: ${({ flex, inline }) =>
    flex
      ? inline
        ? 'inline-flex'
        : 'flex'
      : inline
      ? 'inline-block'
      : 'block'};

  && {
    ${applyStyles};
  }
`

export default Box
