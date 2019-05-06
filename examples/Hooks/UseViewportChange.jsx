import React, { useState } from 'react'
import { useViewportChange, Box } from 'atomic-layout'

const UseViewportChange = () => {
  const [isVisible, updateVisibility] = useState(false)

  useViewportChange(() => {
    updateVisibility(matchMedia('(min-width: 993px)').matches)
  })

  return (
    isVisible && (
      <Box id="element" padding={10}>
        Content
      </Box>
    )
  )
}

export default UseViewportChange
