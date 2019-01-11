import styled from 'styled-components'
import applyStyles from '../utils/styles/applyStyles'

interface BoxProps {
  flex?: boolean
  inline?: boolean
}

const Box = styled.div<BoxProps>`
  ${applyStyles};
  display: ${({ flex, inline }) => flex && (inline ? 'inline-flex' : 'flex')};
`

export default Box
