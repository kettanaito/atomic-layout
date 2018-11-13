import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TemplateIndentation from './TemplateIndentation'
import StylesUndefined from './StylesUndefined'

const Bugfixes = ({ match }) => (
  <Switch>
    <Route
      path={`${match.path}/template-indentation`}
      component={TemplateIndentation}
    />
    <Route
      path={`${match.path}/styles-undefined`}
      component={StylesUndefined}
    />
  </Switch>
)

export default Bugfixes
