import styled from 'styled-components'
import applyStyles from '../utils/styles/applyStyles'

const Box = styled.div`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  ${applyStyles};
`

export default Box
