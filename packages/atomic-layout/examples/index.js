import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'

/**
 * Configuration
 */
import ConfigCustomUnit from './configuration/CustomUnit'
import ConfigCustomBreakpoints from './configuration/CustomBreakpoints'

storiesOf('Configuration|Default configuration', module).add(
  'Nothing so far',
  () => <p>TODO</p>,
)
storiesOf('Configuration|Custom configuration', module)
  .add('Custom unit', () => <ConfigCustomUnit />)
  .add('Custom breakpoints', () => <ConfigCustomBreakpoints />)

/**
 * Box
 */
import BoxDisplayOverride from './components/Box/DisplayOverride'

storiesOf('Components|Box', module).add(
  'Properties override',
  BoxDisplayOverride,
)

/**
 * Composition
 */
import TemplateIndentation from './components/Composition/declaration/TemplateIndentation'
import Templateless from './components/Composition/declaration/Templateless'
import TemplatePeriod from './components/Composition/declaration/TemplatePeriod'
import GridTemplate from './components/Composition/declaration/GridTemplate'
storiesOf('Components|Composition/Declaration', module)
  .add('Template indentation', TemplateIndentation)
  .add('Template-less composition', Templateless)
  .add('Template period', TemplatePeriod)
  .add('Grid template syntax', GridTemplate)

import WeakArea from './components/Composition/rendering/WeakArea'
import NamespaceCollision from './components/Composition/rendering/NamespaceCollision'
import NestedComposition from './components/Composition/rendering/NestedComposition'
storiesOf('Components|Composition/Rendering', module)
  .add('Weak areas', WeakArea)
  .add('Namespace collision', NamespaceCollision)
  .add('Nested composition', NestedComposition)

import BellRendering from './components/Composition/rendering/behaviors/Bell'
import MobileFirstRendering from './components/Composition/rendering/behaviors/MobileFirst'
import NotchRendering from './components/Composition/rendering/behaviors/Notch'
storiesOf('Components|Composition/Rendering/Behaviors', module)
  .add('Mobile-first', MobileFirstRendering)
  .add('Bell', BellRendering)
  .add('Notch', NotchRendering)

import BreakpointEdges from './components/Composition/rendering/responsive-props/BreakpointEdges'
import MobileFirstResponsiveProps from './components/Composition/rendering/responsive-props/MobileFirst'
import BreakpointSpecificResponsiveProps from './components/Composition/rendering/responsive-props/BreakpointSpecific'
import InclusiveNotchResponsiveProps from './components/Composition/rendering/responsive-props/InclusiveNotch'
storiesOf('Components|Composition/Rendering/Responsive props', module)
  .add('Breakpoint edges', BreakpointEdges)
  .add('Mobile-first', MobileFirstResponsiveProps)
  .add('Breakpoint-specific', BreakpointSpecificResponsiveProps)
  .add('Inclusive-notch', InclusiveNotchResponsiveProps)

/**
 * Only
 */
import OnlyDefaultBehavior from './components/Only/OnlyDefaultBehavior'
import OnlyCustomBreakpoints from './components/Only/OnlyCustomBreakpoints'

storiesOf('Components|Only', module)
  .add('Default behavior', OnlyDefaultBehavior)
  .add('Custom breakpoints', OnlyCustomBreakpoints)

/**
 * Visible
 */
import VisibleDefaultBehavior from './components/Visible/VisibleDefaultBehavior'

storiesOf('Components|Visible', module).add(
  'Default behavior',
  VisibleDefaultBehavior,
)

/**
 * Hooks
 */
import UseViewportChange from './hooks/UseViewportChange'
import UseResponsiveValue from './hooks/UseResponsiveValue'
import UseBreakpointChange from './hooks/UseBreakpointChange'
import UseResponsiveProps from './hooks/UseResponsiveProps'
import UseResponsiveComponent from './hooks/UseResponsiveComponent'

storiesOf('Hooks', module)
  .add('useViewportChange', () => <UseViewportChange />)
  .add('useResponsiveValue', () => <UseResponsiveValue />)
  .add('useBreakpointChange', () => <UseBreakpointChange />)
  .add('useResponsiveProps', () => <UseResponsiveProps />)
  .add('useResponsiveComponent', () => <UseResponsiveComponent />)

/**
 * Semantics
 */
import PolymorphicProp from './semantics/PolymorphicProp'

storiesOf('Semantics', module).add('Polymorphic prop', PolymorphicProp)

/**
 * Recipes
 */
import IterativeAreas from './recipes/IterativeAreas'

storiesOf('Recipes|All', module).add('Iterative areas', IterativeAreas)

/**
 * Bugfixes
 */
import StylesUndefined from './regression/StylesUndefined'

storiesOf('Regression|All', module).add('Styles undefined', StylesUndefined)
