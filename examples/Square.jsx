import styled from 'styled-components'

const Square = styled.span`
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 40px;
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  background-color: hsla(235, 90%, 72%, 0.25);
  border: 1px solid hsla(235, 50%, 75%, 0.35);
  border-radius: 3px;
  color: hsla(235, 25%, 50%);
  font-size: 90%;
  font-weight: bold;
  text-transform: uppercase;
`

export default Square
