import React from 'react'
import { Composition } from 'atomic-layout'
import Square from '@stories/Square'

const templateMobile = `
  header 100px
  content 1fr
`

const templateTablet = `
  header content 500px
  / 200px 1fr
`

const List = () => (
  <Composition
    id="composition"
    template={templateMobile}
    templateMd={templateTablet}
    gutter={10}
  >
    {({ Header, Content }) => (
      <>
        <Header id="header">
          <Square>Header</Square>
        </Header>
        <Content id="content">
          <Square>Content</Square>
        </Content>
      </>
    )}
  </Composition>
)

export default List
