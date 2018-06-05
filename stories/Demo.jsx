import React from 'react'
import Square from './Square'
import Layout, { Box, Composition } from '../'

Layout.configure({
  defaultUnit: 'rem',
})

const templateMobile = `
  'actions'
  'image'
  'content'
  'footer'
`

const templateTablet = `
  'image content'
  'image footer'
`

const templateDesktop = `
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
  <div>
    <Composition
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
    </Composition>

    <Box marginVertical={2} />

    <Composition
      template={`
      'thumbnail content actions'
    `}
      templateCols="auto 1fr"
    >
      {({ Thumbnail, Content, Actions }) => (
        <React.Fragment>
          <Thumbnail>Image</Thumbnail>
          <Content>Text</Content>
          <Actions>Add</Actions>
        </React.Fragment>
      )}
    </Composition>
  </div>
)

export default Demo
