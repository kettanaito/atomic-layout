import React from 'react'
import Square from './Square'
import { Box, Composition, Only } from '../lib'

const templateMobile = `
  actions
  image
  content
  footer
`

const templateTablet = `
  image content
  image footer
`

const templateDesktop = `
  image content
  footer footer
`

const templateTv = `
  image
  actions
  content
  footer
`

const Demo = () => (
  <div>
    <Composition
      gutter={10}
      margin={0}
      areas={templateMobile}
      areasSm={templateTablet}
      areasMd={templateDesktop}
      areasLg={templateTv}
    >
      {({ Image, Content, Actions, Footer }) => (
        <React.Fragment>
          <Actions>
            <Square>Actions</Square>
          </Actions>
          <Image>
            <Square>Image</Square>
          </Image>
          <Content as="main">
            <Square>Content</Square>
            <Only for="md">I am on "md"!</Only>
          </Content>
          <Footer>
            <Square>Footer</Square>
            <Only to="sm">LESS THEN SM</Only>
            <Only from="lg">MORE THAN LG</Only>
          </Footer>
        </React.Fragment>
      )}
    </Composition>

    {/* <Box marginVertical={2} /> */}

    {/* <Composition template="thumbnail content actions" templateCols="auto 1fr">
      {({ Thumbnail, Content, Actions }) => (
        <React.Fragment>
          <Thumbnail>Image</Thumbnail>
          <Content>Text</Content>
          <Actions>Add</Actions>
        </React.Fragment>
      )}
    </Composition> */}
  </div>
)

export default Demo
