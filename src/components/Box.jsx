import styled from 'styled-components'
import applyStyles from '../utils/styles/applyStyles'

const Box = styled.div`
  ${applyStyles};
  display: ${({ flex, inline }) => flex && (inline ? 'inline-flex' : 'flex')};
`

export default Box
