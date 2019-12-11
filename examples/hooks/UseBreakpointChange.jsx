import React, { useState } from 'react'
import { useBreakpointChange } from 'atomic-layout'

const UseBreakpointChange = () => {
  const [text, setText] = useState('default')

  useBreakpointChange((breakpointName) => {
    setText(breakpointName)
  })

  return (
    <div>
      <p id="element">{text}</p>
    </div>
  )
}

export default UseBreakpointChange
