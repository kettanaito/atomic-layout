import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MobileFirst from './MobileFirst'
import BreakpointSpecific from './BreakpointSpecific'
import InclusiveBell from './InclusiveBell'

const ResponsiveProps = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/mobile-first`} component={MobileFirst} />
    <Route
      path={`${match.path}/breakpoint-specific`}
      component={BreakpointSpecific}
    />
    <Route path={`${match.path}/inclusive-bell`} component={InclusiveBell} />
  </Switch>
)

export default ResponsiveProps
