import React from 'react'
import Layout from '../../'

const template = `
  'header content footer'
`

export default class Playground extends React.Component {
  render() {
    return (
      <div>
        <Layout template={template} gutter={1}>
          {({ Header, Content, Footer }) => (
            <React.Fragment>
              <Header>Header</Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </React.Fragment>
          )}
        </Layout>
      </div>
    )
  }
}
