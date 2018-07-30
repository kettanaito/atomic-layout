import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropAliases from './PropAliases'

const ResponsiveProps = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/prop-aliases`} component={PropAliases} />
  </Switch>
)

export default ResponsiveProps
