import React from 'react'
import Square from '../Square'
import { Composition } from '../../'

const template = `
  'header'
  'content'
  'footer'
`

const templateTablet = `
  'header content footer'
`

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <Composition
          template={`
          'col'
        `}
        >
          {({ Col }) => ['lorem', 'ipsum'].map((entry) => <Col>{entry}</Col>)}
        </Composition>

        <Composition
          template={template}
          templateSmUp={templateTablet}
          gutter={1}
        >
          {({ Header, Content, Footer }) => (
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
            </React.Fragment>
          )}
        </Composition>
      </div>
    )
  }
}
