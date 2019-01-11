import React from 'react'
import Square from '../Square'
import { Composition } from '../../lib'

const template = `
  header
  content
  footer
`

const templateTablet = `
  header content footer
`

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <Composition template="col" paddingVertical={20}>
          {({ Col }) =>
            ['lorem', 'ipsum'].map((entry, index) => (
              <Col col="auto" key={index}>
                {entry}
              </Col>
            ))
          }
        </Composition>

        <Composition
          template={template}
          templateSmUp={templateTablet}
          gutter={1}
        >
          {({ Header, Content, Footer, Abc }) => (
            <React.Fragment>
              <Header>
                <Square />
              </Header>
              <Content>
                <Square />
              </Content>
              <Footer>
                <Square />
              </Footer>
              <Abc>Hey!</Abc>
            </React.Fragment>
          )}
        </Composition>
      </div>
    )
  }
}
