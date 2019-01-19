import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OnlyExample from './OnlyExample'
import OnlyCustom from './OnlyCustom'

const Composition = ({ match }) => (
  <Switch>
    <Route path={match.path} component={OnlyExample} />
    <Route path={`${match.path}/custom`} component={OnlyCustom} />
  </Switch>
)

export default Composition
