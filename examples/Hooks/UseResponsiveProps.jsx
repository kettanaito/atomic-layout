import React from 'react'
import styled from 'styled-components'
import { useResponsiveProps } from 'atomic-layout'

const Avatar = styled.div`
  position: relative;
  background-color: #ccc;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

const Badge = styled.span`
  display: inline-block;
  background-color: green;
  border-radius: 50%;
  border: 3px solid #fff;
  height: 10px;
  width: 10px;
`

const Element = (props) => {
  const { size, showBadge, fontSize } = useResponsiveProps(props)

  return (
    <div id="element" style={{ fontSize }}>
      <Avatar id="avatar" size={size}>
        {showBadge && <Badge id="badge" />}
      </Avatar>
    </div>
  )
}

const UseResponsivePropsExample = () => (
  <Element
    // High-pass
    size={50}
    sizeMd={75}
    sizeLg={100}
    // Bell
    fontSize={16}
    fontSizeSm={20}
    fontSizeLg={16}
    // Notch
    showBadgeMdDown={true}
    showBadgeLg={false}
  />
)

export default UseResponsivePropsExample
