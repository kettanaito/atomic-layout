import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CustomBreakpoints from './CustomBreakpoints'
import CustomUnit from './CustomUnit'

const CustomConfiguration = ({ match }) => (
  <Switch>
    <Route
      path={`${match.path}/custom-breakpoints`}
      component={CustomBreakpoints}
    />
    <Route path={`${match.path}/custom-unit`} component={CustomUnit} />
  </Switch>
)

export default CustomConfiguration
