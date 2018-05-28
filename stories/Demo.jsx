import React from 'react'
import Square from './Square'
import { Layout } from '../'

const templateMobile = `
  'image'
  'content'
  'footer'
`

const templateTablet = `
  'image content'
  'image footer'
`

const templateDesktop = `
  'actions actions'
  'image content'
  'footer footer'
`

const templateTv = `
  'image'
  'actions'
  'content'
  'footer'
`

const Demo = () => (
  <Layout
    gutter={1}
    template={templateMobile}
    templateSm={templateTablet}
    templateMd={templateDesktop}
    templateLg={templateTv}
  >
    {({ Image, Content, Actions, Footer }) => (
      <React.Fragment>
        <Actions>
          <Square>Actions</Square>
        </Actions>
        <Image>
          <Square>Image</Square>
        </Image>
        <Content>
          <Square>Content</Square>
        </Content>
        <Footer>
          <Square>Footer</Square>
        </Footer>
      </React.Fragment>
    )}
  </Layout>
)

export default Demo
