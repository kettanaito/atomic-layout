import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NestedComposition from './NestedComposition'

const Composition = ({ match }) => (
  <Switch>
    <Route
      path={`${match.path}/nested-composition`}
      component={NestedComposition}
    />
  </Switch>
)

export default Composition
