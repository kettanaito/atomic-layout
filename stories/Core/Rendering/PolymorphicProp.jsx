import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const PolymorphicProp = () => (
  <Composition areas="header main element footer" gutter={10}>
    {({ Header, Main, Element, Footer }) => (
      <React.Fragment>
        <Header as="header" id="header">
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
      </React.Fragment>
    )}
  </Composition>
)

export default PolymorphicProp
