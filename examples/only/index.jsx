import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OnlyExample from './OnlyExample'

const Composition = ({ match }) => (
  <Switch>
    <Route path={match.path} component={OnlyExample} />
  </Switch>
)

export default Composition
