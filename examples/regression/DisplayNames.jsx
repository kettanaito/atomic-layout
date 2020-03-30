import React from 'react'
import { Box, Composition, Only, Visible, MediaQuery } from 'atomic-layout'

const DisplayNames = () => (
  <div>
    <Box id="box">{Box.displayName}</Box>
    <Composition
      id="composition"
      areas="one"
      data-display-name={Composition.displayName}
    >
      {(Areas) => (
        <Areas.One id="composition-area">{Areas.One.displayName}</Areas.One>
      )}
    </Composition>
    <Only id="only" from="xs">
      {Only.displayName}
    </Only>
    <Visible id="visible" from="xs">
      {Visible.displayName}
    </Visible>
    <MediaQuery matches={true}>
      {() => <p id="media-query">{MediaQuery.displayName}</p>}
    </MediaQuery>
  </div>
)

export default DisplayNames
