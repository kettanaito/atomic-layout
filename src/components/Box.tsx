import styled from 'styled-components'
import { GenericProps } from '../const/props'
import applyStyles from '../utils/styles/applyStyles'

export interface BoxProps extends GenericProps {
  flex?: boolean
  inline?: boolean
}

const Box = styled.div<BoxProps>`
  ${applyStyles};
  display: ${({ flex, inline }) => flex && (inline ? 'inline-flex' : 'flex')};
`

export default Box
