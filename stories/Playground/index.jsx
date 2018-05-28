import React from 'react'
import Square from '../Square'
import { Layout } from '../../'

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
        <Layout
          template={`
          'col'
        `}
        >
          {({ Col }) => ['lorem', 'ipsum'].map((entry) => <Col>{entry}</Col>)}
        </Layout>

        <Layout template={template} templateSmUp={templateTablet} gutter={1}>
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
        </Layout>
      </div>
    )
  }
}
