import React from 'react'
import { Composition } from 'atomic-layout'
import Inclusive from '../behavior/Inclusive'
import Bell from '../behavior/Bell'

const NestedComposition = () => (
  <Inclusive>
    <Bell />
  </Inclusive>
)

export default NestedComposition
