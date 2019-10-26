import React from 'react'
import styled from 'styled-components'
import { useResponsiveComponent } from 'atomic-layout'

const Text = useResponsiveComponent(
  styled.h1`
    color: ${({ color }) => color};
    font-size: ${({ size }) => size}px;
  `,
)

const Scenario = () => (
  <Text
    id="text"
    size={16}
    sizeMd={20}
    sizeLg={24}
    color="black"
    colorSm="green"
    colorLg="red"
  >
    Quick brown fox
  </Text>
)

export default Scenario
