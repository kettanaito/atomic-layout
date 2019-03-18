import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IterativeAreas from './IterativeAreas'

const ResponsiveProps = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/iterative-areas`} component={IterativeAreas} />
  </Switch>
)

export default ResponsiveProps
