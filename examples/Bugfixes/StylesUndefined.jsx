import React from 'react'
import { Composition } from 'atomic-layout'

const TemplateIndentation = () => (
  <Composition id="composition" paddingRight={12} gutter={undefined}>
    <span>
      Must not contain <code>gutter</code> CSS property.
    </span>
  </Composition>
)

export default TemplateIndentation
