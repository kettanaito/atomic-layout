import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropAliases from './PropAliases'
import PolymorphicProp from './PolymorphicProp'

const Other = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/prop-aliases`} component={PropAliases} />
    <Route
      path={`${match.path}/polymorphic-prop`}
      component={PolymorphicProp}
    />
  </Switch>
)

export default Other
