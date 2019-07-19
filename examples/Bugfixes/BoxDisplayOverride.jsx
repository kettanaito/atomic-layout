import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

const StyledBox = styled.div`
  display: table;
`

const MediaQueryStory = () => {
  return (
    <Box as={StyledBox} id="box">
      Content
    </Box>
  )
}

export default MediaQueryStory
