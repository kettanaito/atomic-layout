import React from 'react'
import { Composition } from 'atomic-layout'
import Inclusive from '@stories/Core/Rendering/Inclusive'
import Notch from '@stories/Core/Rendering/Notch'

const NestedComposition = () => (
  <Inclusive>
    <Notch />
  </Inclusive>
)

export default NestedComposition
