import React, { useState } from 'react'
import { useBreakpointChange } from 'atomic-layout'

const UseBreakpointChange = () => {
  const [text, setText] = useState('default')
  const [calledTimes, setCalledTimes] = useState(0)

  useBreakpointChange((breakpointName) => {
    setText(breakpointName)
    setCalledTimes((calledTimes) => calledTimes + 1)
  })

  return (
    <div>
      <p id="element">{text}</p>
      <p id="call-count">{calledTimes}</p>
    </div>
  )
}

export default UseBreakpointChange
