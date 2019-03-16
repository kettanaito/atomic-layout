import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Behavior from './behavior'
import ResponsiveProps from './responsive-props'
import Composition from './composition'
import Only from './only'
import CustomConfiguration from './custom-configuration'
import Other from './other'
import Recipes from './recipes'
import Bugfixes from './bugfixes'

const Root = () => (
  <Switch>
    <Route path="/behavior" component={Behavior} />
    <Route path="/responsive-props" component={ResponsiveProps} />
    <Route path="/composition" component={Composition} />
    <Route path="/only" component={Only} />
    <Route path="/custom-configuration" component={CustomConfiguration} />
    <Route path="/other" component={Other} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/bugfixes" component={Bugfixes} />
  </Switch>
)

export default Root
