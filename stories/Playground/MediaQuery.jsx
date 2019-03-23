import React from 'react'
import { MediaQuery } from 'atomic-layout'

const MediaQueryStory = () => {
  return (
    <MediaQuery minWidth={700}>
      {(matches) => matches && <p>Content!</p>}
    </MediaQuery>
  )
}

export default MediaQueryStory
