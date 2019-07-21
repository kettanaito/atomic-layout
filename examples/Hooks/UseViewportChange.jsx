import React, { useState } from 'react'
import Layout, { useViewportChange, Box } from 'atomic-layout'

const UseViewportChange = () => {
  const [isVisible, updateVisibility] = useState(false)

  useViewportChange(() => {
    updateVisibility(
      matchMedia(`(min-width: ${Layout.breakpoints.lg.minWidth})`).matches,
    )
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
