import React from 'react'
import styled from 'supported-styling-library'
import { Box } from 'atomic-layout'

const StyledBox = styled.div`
  display: table;
`

const BoxDisplayOverride = () => {
  return (
    <Box as={StyledBox} id="box">
      I should have <code>display: table</code>
    </Box>
  )
}

export default BoxDisplayOverride
