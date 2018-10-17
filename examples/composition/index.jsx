import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NestedComposition from './NestedComposition'
import Templateless from './Templateless'

const Composition = ({ match }) => (
  <Switch>
    <Route
      path={`${match.path}/nested-composition`}
      component={NestedComposition}
    />
    <Route path={`${match.path}/templateless`} component={Templateless} />
  </Switch>
)

export default Composition
