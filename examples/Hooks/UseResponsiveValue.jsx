import React from 'react'
import { useResponsiveValue, Box } from 'atomic-layout'

const UseResponsiveValue = () => {
  const text = useResponsiveValue(
    {
      xs: 'xs',
      md: 'md',
      lg: 'lg',
    },
    'default',
  )

  return (
    <Box id="element" padding={10}>
      {text}
    </Box>
  )
}

export default UseResponsiveValue
