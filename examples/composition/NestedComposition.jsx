import React from 'react'
import { Composition } from '@lib'
import Inclusive from '../behavior/Inclusive'
import Bell from '../behavior/Bell'

const NestedComposition = () => (
  <Inclusive>
    <Bell />
  </Inclusive>
)

export default NestedComposition
