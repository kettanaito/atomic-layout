import React from 'react'
import styled from 'styled-components'
import { withResponsiveProps } from 'atomic-layout'

const Text = withResponsiveProps(styled.h1`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
`)

const Scenario = () => (
  <Text
    size={16}
    sizeMd={20}
    sizeLg={24}
    color="black"
    colorMd="green"
    colorLg="red"
  >
    Quick brown fox
  </Text>
)

export default Scenario
