import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Behavior from './behavior'
import ResponsiveProps from './responsive-props'
import Composition from './composition'
import CustomConfiguration from './custom-configuration'
import Misc from './misc'
import Bugfixes from './bugfixes'

const Root = () => (
  <Switch>
    <Route path="/behavior" component={Behavior} />
    <Route path="/responsive-props" component={ResponsiveProps} />
    <Route path="/composition" component={Composition} />
    <Route path="/custom-configuration" component={CustomConfiguration} />
    <Route path="/misc" component={Misc} />
    <Route path="/bugfixes" component={Bugfixes} />
  </Switch>
)

export default Root
