import styled from 'styled-components'
import applyStyles from '../utils/styles/applyStyles'

const Box = styled.div`
  ${applyStyles};
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
`

export default Box
