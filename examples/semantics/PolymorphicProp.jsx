import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const CustomHeader = styled.header`
  background-color: #eee;
  display: block;
  padding: 10px;
`

const PolymorphicProp = () => (
  <Composition areas="header main element footer" gutter={10}>
    {({ Header, Main, Element, Footer }) => (
      <>
        <Header as={CustomHeader} flex id="header" padding={20}>
          <Square>Header</Square>
        </Header>
        <Main as="main" id="main">
          <Square>Main</Square>
        </Main>
        <Element id="default">
          <Square>Default element</Square>
        </Element>
        <Footer as="footer" id="footer">
          <Square>Footer</Square>
        </Footer>
      </>
    )}
  </Composition>
)

export default PolymorphicProp
