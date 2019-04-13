import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'

/**
 * Rendering
 */
import InclusiveRendering from './Core/Rendering/Inclusive'
import MobileFirstRendering from './Core/Rendering/MobileFirst'
import NotchRendering from './Core/Rendering/Notch'
import PolymorphicProp from './Core/Rendering/PolymorphicProp'

storiesOf('Core|Rendering', module)
  .add('Mobile-first', () => <MobileFirstRendering />)
  .add('Inclusive', () => <InclusiveRendering />)
  .add('Notch', () => <NotchRendering />)
  .add('Polymorphic prop', () => <PolymorphicProp />)

/**
 * Responsive props
 */
import MobileFirstResponsiveProps from './Core/ResponsiveProps/MobileFirst'
import BreakpointSpecificResponsiveProps from './Core/ResponsiveProps/BreakpointSpecific'
import InclusiveNotchResponsiveProps from './Core/ResponsiveProps/InclusiveNotch'

storiesOf('Core|Responsive props', module)
  .add('Mobile-first', () => <MobileFirstResponsiveProps />)
  .add('Breakpoint-specific', () => <BreakpointSpecificResponsiveProps />)
  .add('Inclusive-notch', () => <InclusiveNotchResponsiveProps />)

/**
 * Configuration
 */
import ConfigCustomUnit from './Core/Configuration/CustomUnit'
import ConfigCustomBreakpoints from './Core/Configuration/CustomBreakpoints'

storiesOf('Core|Configuration', module)
  .add('Custom unit', () => <ConfigCustomUnit />)
  .add('Custom breakpoints', () => <ConfigCustomBreakpoints />)

/**
 * Composition
 */
import NestedComposition from './Components/Composition/NestedComposition'
import Templateless from './Components/Composition/Templateless'

storiesOf('Components|Composition', module)
  .add('Nested composition', () => <NestedComposition />)
  .add('Templateless', () => <Templateless />)

/**
 * Only
 */
import OnlyDefault from './Components/Only/OnlyDefault'
import OnlyCustomBreakpoint from './Components/Only/OnlyCustom'

storiesOf('Components|Only', module)
  .add('Default', () => <OnlyDefault />)
  .add('Custom breakpoint', () => <OnlyCustomBreakpoint />)

/**
 * Hooks
 */
import UserResponsiveValue from './Hooks/UseResponsiveValue'
storiesOf('Hooks', module).add('useResponsiveValue', () => (
  <UserResponsiveValue />
))

/**
 * Recipes
 */
import IterativeAreas from './Recipes/IterativeAreas'

storiesOf('Recipes|All', module).add('Iterative areas', () => (
  <IterativeAreas />
))

/**
 * Bugfixes
 */
import StylesUndefined from './Bugfixes/StylesUndefined'
import TemplateIndentation from './Bugfixes/TemplateIndentation'

storiesOf('Bugfixes|All', module)
  .add('Styles undefined', () => <StylesUndefined />)
  .add('Template indentation', () => <TemplateIndentation />)

/**
 * Playground
 */
import PeriodExample from './Playground/PeriodExample'
import MediaQuery from './Playground/MediaQuery'

storiesOf('Playground', module)
  .add('Period', () => <PeriodExample />)
  .add('MediaQuery', () => <MediaQuery />)
