import React from 'react'
import Bell from './behaviors/Bell'
import Notch from './behaviors/Notch'

const NestedComposition = () => (
  <Bell>
    <Notch />
  </Bell>
)

export default NestedComposition
