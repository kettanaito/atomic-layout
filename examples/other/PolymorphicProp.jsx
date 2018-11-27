import React from 'react'
import { Composition } from 'atomic-layout'

export default class PolymorphicProp extends React.Component {
  render() {
    return (
      <Composition template="header main element footer" gutter={10}>
        {({ Header, Main, Element, Footer }) => (
          <React.Fragment>
            <Header as="header" id="header">
              Header
            </Header>
            <Main as="main" id="main">
              Main
            </Main>
            <Element id="default">Default element</Element>
            <Footer as="footer" id="footer">
              Footer
            </Footer>
          </React.Fragment>
        )}
      </Composition>
    )
  }
}
