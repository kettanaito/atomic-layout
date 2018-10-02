import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TemplateIndentation from './TemplateIndentation'

const Bugfixes = ({ match }) => (
  <Switch>
    <Route
      path={`${match.path}/template-indentation`}
      component={TemplateIndentation}
    />
  </Switch>
)

export default Bugfixes
