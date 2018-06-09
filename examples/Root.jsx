import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Behavior from './behavior'

const Root = () => (
  <Switch>
    <Route path="/behavior" component={Behavior} />
  </Switch>
)

export default Root
