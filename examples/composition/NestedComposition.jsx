import React from 'react'
import { Composition } from 'atomic-layout'
import Inclusive from '../behavior/Inclusive'
import Notch from '../behavior/Notch'

const NestedComposition = () => (
  <Inclusive>
    <Notch />
  </Inclusive>
)

export default NestedComposition
