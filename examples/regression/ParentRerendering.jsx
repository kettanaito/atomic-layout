import React, { useState } from 'react'
import { Composition } from 'atomic-layout'

const ParentRerendering = () => {
  const [value, setValue] = useState('')

  return (
    <Composition areas="title content">
      {(Areas) => (
        <>
          <Areas.Title>
            <h2>Title</h2>
          </Areas.Title>
          <Areas.Content>
            <input
              name="username"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Areas.Content>
        </>
      )}
    </Composition>
  )
}

export default ParentRerendering
