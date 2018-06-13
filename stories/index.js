import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'

import Playground from './Playground'
import Demo from './Demo'

/* Behavior */
import MobileFirst from '../examples/behavior/MobileFirst'
import Inclusive from '../examples/behavior/Inclusive'
import Bell from '../examples/behavior/Bell'

storiesOf('Stories', module)
  .add('Playground', () => <Playground />)
  .add('Demo', () => <Demo />)

storiesOf('Behavior', module)
  .add('Mobile first', () => <MobileFirst />)
  .add('Inclusive', () => <Inclusive />)
  .add('Bell', () => <Bell />)
