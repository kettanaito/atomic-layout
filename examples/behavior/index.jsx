import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MobileFirst from './MobileFirst'
import Inclusive from './Inclusive'
import Bell from './Bell'

const Behavior = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/mobile-first`} component={MobileFirst} />
    <Route path={`${match.path}/inclusive`} component={Inclusive} />
    <Route path={`${match.path}/bell`} component={Bell} />
  </Switch>
)

export default Behavior
