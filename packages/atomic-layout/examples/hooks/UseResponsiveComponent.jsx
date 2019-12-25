import React from 'react'
import styled from 'styled-components'
import { useResponsiveComponent } from 'atomic-layout'

const Text = useResponsiveComponent(
  styled.h1`
    color: ${({ color }) => color};
    font-size: ${({ size }) => size}px;
  `,
)

const Scenario = () => {
  const textRef = React.useRef({})
  const [state, setState] = React.useState('red')
  const [refDerivedData, setRefDerivedData] = React.useState(null)

  React.useEffect(() => {
    setRefDerivedData(textRef.current.id)
  }, [textRef.current])

  return (
    <div>
      <Text
        ref={textRef}
        id="text"
        size={16}
        sizeMd={20}
        sizeLg={24}
        color="black"
        colorSm="green"
        colorLg={state}
      >
        <p>
          Quick brown fox (<span id="ref">#{refDerivedData}</span>)
        </p>
        <button id="change-color" onClick={() => setState('violet')}>
          Make violet
        </button>
      </Text>
    </div>
  )
}

export default Scenario
