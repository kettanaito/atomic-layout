import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Behavior from './behavior'
import ResponsiveProps from './responsive-props'
import Composition from './composition'

const Root = () => (
  <Switch>
    <Route path="/behavior" component={Behavior} />
    <Route path="/responsive-props" component={ResponsiveProps} />
    <Route path="/composition" component={Composition} />
  </Switch>
)

export default Root
