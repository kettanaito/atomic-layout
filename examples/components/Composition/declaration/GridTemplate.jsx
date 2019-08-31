import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const templateMobile = `
  header 100px
  content 1fr
  footer auto
`

const templateTablet = `
  header content footer 500px
  / 200px 1fr auto
`

const List = () => (
  <Composition
    id="composition"
    template={templateMobile}
    templateMd={templateTablet}
    gutter={10}
  >
    {({ Header, Content, Footer }) => (
      <>
        <Header id="header">
          <Square>Header</Square>
        </Header>
        <Content id="content">
          <Square>Content</Square>
        </Content>
        <Footer id="footer">
          <Square height="70px" width="50px">
            Auto
          </Square>
        </Footer>
      </>
    )}
  </Composition>
)

export default List
