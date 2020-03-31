import React, { useState } from 'react'
import { Only } from 'atomic-layout'

const Child = ({ disabled }) => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>
        Count: <span id="count">{count}</span>
      </p>
      <button
        id="button-increment"
        disabled={disabled}
        onClick={() => setCount(count + 1)}
      >
        Increase counter
      </button>
    </div>
  )
}

const OnlyUnmount = () => {
  const [isDisabled, setDisabled] = useState(false)

  return (
    <div>
      <Only from="xs">
        <Child disabled={isDisabled} />
      </Only>
      <button id="button-disable" onClick={() => setDisabled(!isDisabled)}>
        Toggle disabled
      </button>
    </div>
  )
}

export default OnlyUnmount
