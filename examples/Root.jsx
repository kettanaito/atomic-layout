import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Behavior from './behavior'
import ResponsiveProps from './responsive-props'

const Root = () => (
  <Switch>
    <Route path="/behavior" component={Behavior} />
    <Route path="/responsive-props" component={ResponsiveProps} />
  </Switch>
)

export default Root
